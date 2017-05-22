---
title: Gameshow Time
category: The Tenets of FP
order: 2
---

### Let's play: is it a pure function?

Consider the following code snippets. Are they a pure function? If not, why?

{% highlight javascript %}
  const foo = (bar) => {}
{% endhighlight %}
[](#spoiler "No, this function does not return a value. While this itself is not an effect, this function cannot do anything of value and is generally disallowed in functional programming languages. We could not construct a lookup table for this function.")

{% highlight javascript %}
  const foo = (bar) => {
    console.log('adding 1 to bar');
    return bar + 1;
  }
{% endhighlight %}
[](#spoiler "No, this function has the effect of writing to the console. You could argue because this doesn't change anything in the application state that is does't count. However if you replaced this function with a lookup table you would certainly get different results from running the program.")

{% highlight javascript %}
  const foo = (bar) => {
    if (bar > 10) {
      return 4;
    }
    return 0;
  }
{% endhighlight %}
[](#spoiler "Yes this is a pure function. It has 1 argument, returns a value and could be turned into a lookup table. Ideally we want to write all our pure functions as a single expression so const foo = (bar) => bar > 10 ? 4 : 0; would be preferrable here")

{% highlight javascript %}
  const foo = () => return 5;
{% endhighlight %}
[](#spoiler "This one is debatable. This function doesn't have any arguments, but that's ok in JavaScript. It meets all the other criteria including being replaced by a very large lookup table. In Elm this would merely be a constant.")

{% highlight javascript %}
  const foo = (bar) => bar > 10 ? bar : baz;
{% endhighlight %}
[](#spoiler "No, this function references baz in calculating the resulting value for the <= 10 case. This means if baz changes, the result of the function will change.")

Hopefully you are getting a sense of what pure vs effectful functions look like.

## [Next](/2-the-tenets-of-fp/detangling-functions)
