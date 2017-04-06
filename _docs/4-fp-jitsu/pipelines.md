---
title: Pipelines
category: FP Jitsu
order: 2
---

Combining functions in this way might not strike you as particularly general purpose, and you'd be right. Often we want to combine two functions for a specific task and really might not do so anywhere else in the app. The value of easy composition comes when we can chain together composed functions into a data transformation pipeline.

We already have the `pipe` function that we built, but that only works on two functions at a time. In most functional languages we'd build up the pipeline by defining a custom operator that does the pipe/compose operation. In JavaScript we'll have to settle for a more generalized function that works on any number of functions. We could accomplish this using a for loop

{% highlight javascript %}
  const pipe =
    (...functions) =>
      (...args) => {
        let pipedValue = functions[0](...args);
        for (var i = 1; i < functions.length; i++) {
          pipedValue = functions[i](pipedValue);
        }
        return pipedValue;
      };
{% endhighlight %}

or recursively

{% highlight javascript %}
  const pipe =
    (...functions) =>
      (...args) => {
        let apply = (functionsToApply, currentValue) =>
          functionsToApply.length === 0
            ? currentValue
            : apply(
                functionsToApply.slice(1, functionsToApply.length),
                functionsToApply[0](currentValue)
              );

        return apply(functions.slice(1, functions.length), functions[0](...args));
      };
{% endhighlight %}

which means we could also accomplish this with `fold`

{% highlight javascript %}
  const pipe =
    (...functions) =>
      (...args) =>
        fold(
          (fn, value) => fn(value),
          functions[0](...args),
          functions.slice(1, functions.length)
        );
{% endhighlight %}

Given this new pipelining capability combined with some of the tools we've already written we can now write declarative looking transformations:

{% highlight javascript %}
  const requestLogs = [
    {
      domain: 'somedomain.somewhere',
      path: 'path/to/the',
      resource: 'thing.extension',
      httpVerb: 'GET'
    }
  ];

  // business rule: files hosted under images should not be nested more than 1 level deep
  // find all the paths in the log that violate this rule, 'images/foo/bar'
  // should be reported as 'foo/bar'

  const invalidImagePaths = pipe(
    map((request) => request.path.split('/')),
    filter((parts) => parts.length > 2 && parts[0] === 'images'),
    map((parts) => parts.slice(1, parts.length).join('/')
  )(requestLogs);
{% endhighlight %}

If we were working with a standard library of functions that were curried and not on the object prototype, we could also write it this way. Here is an example using Ramda:

{% highlight javascript %}
  const invalidImagePaths = R.pipe(
    R.map(R.get('path')),
    R.map(R.split('/')),
    R.filter((parts) => parts.length > 2 && parts[0] === 'images'),
    R.map(R.drop(1)),
    R.map(R.join('/'))
  )(requestLogs);
{% endhighlight %}

Compare this to a for loop style solution:

{% highlight javascript %}
  const invalidPaths = [];

  for (log on requestLogs) {
    const parts = log.path.split('/');
    if (parts.length > 2 && parts[0] === 'images') {
      invalidPaths.push(parts.slice(1, parts.length).join('/'));
    }
  }
{% endhighlight %}

While the for loop style may be more familiar, look at how intertwined the machinery of iteration and updating a collection are with the logic of what you want to accomplish. This is a fairly trivial example, I'm sure you've seen much much worse.
