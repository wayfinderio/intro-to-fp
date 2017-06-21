---
title: Swiss Army Knife
category: The Guts of FP
order: 3
---

Given that `fold` is essentially the canonical while loop, but in functional form, what other variants might be common? Well, we've already encountered two specific usages of `fold`, the `filter` usage and the `map` usage.

{% highlight javascript %}
  // filter style operation
  // a -> Array a -> Array a
  const filterFn = (element, collection) =>
    someCondition(element)
      ? [...collection, element]
      : collection;

  // map style operation
  // a -> Array b -> Array b
  const mapFn = (element, collection) => [...collection, someOperation(element)];

  const filteredValues = fold(filterFn, [], [3, 4, 5, 6]);
  const transformedValues = fold(mapFn, [], [3, 4, 5, 6]);
{% endhighlight %}

In the same way that a `while` loop is more general than a `for` loop, and that is more general than the `for in` or `for of` variants, we can also write a more specialized version. What we'd like to have an equivalent of `filterFn` + `fold` but with the condition test parameterized. The signature for this would look like:

{% highlight javascript %}
  // (a -> Boolean) -> Array a -> Array a
  const filter = (filterFn, array) => // filtered array
{% endhighlight %}

We could do the same for `mapFn` + `fold`:

{% highlight javascript %}
  // (a -> b) -> Array a -> Array b
  const map = (mapFn, array) => // array of mapped values
{% endhighlight %}

### Exercise

In the same manner that you implemented `fold`, implement a version of `filter` and `map` that operate on arrays.

Open `exercises/map-and-filter.js` in your editor and implement the map and filter functions. Do this either using a for loop or using recursion (or try both).

To test your changes, run `npm run -s map-and-filter` from the `exercises` directory.

### It All Comes Back To Fold

I'm sure you noticed that the structure of your `filter` and `map` functions was very similar to your `fold` implementation. It would be nice to be able to re-use the parts of `fold` that are shared by `filter`. At one point we were accomplishing a specialized version of `filter` by providing a function to `fold`.

{% highlight javascript %}
  // a -> Array a -> Array a
  const filterFn = (element, collection) =>
    someCondition(element)
      ? [...collection, element]
      : collection;


  //     foldFn    -> init ->  array  -> result
  // (a -> b -> b) ->   b  -> Array a ->   b
  const fold = (foldFn, init, array) => ...
{% endhighlight %}

The `a -> Array a -> Array a` fits nicely into the first argument of fold which is `(a -> Array b -> Array b)`. Just because `fold` allows for two different types (`a` & `b`) doesn't mean we need to use this freedom. However, this does not make the filter function configurable, in order for that to happen we'd need to pull out the `someCondition` check into another parameter.

{% highlight javascript %}
  // (a -> Boolean) -> a -> Array a -> Array a
  const filterFn = (someCondition, element, collection) =>
    someCondition(element)
      ? [...collection, element]
      : collection;
{% endhighlight %}

This new function now has all the configuration we need to provide the filter condition as an argument of type `a -> Boolean`. This is great, except that now the shape of our `filterFn` doesn't fit `fold`.

#### Soooooo close...
{% highlight javascript %}
  // (a -> Boolean) -> a -> Array a -> Array a
  //                  (a ->    b    ->    b   ) -> b -> Array a -> b
{% endhighlight %}

If we could fill in the first part, the types would line up again, but in JavaScript as in most languages you provide all the arguments at the same time.

> Strictly this isn't true due to defaults and undefined being auto-assigned to any arguments you don't provide a value for. Conceptually though, you either provide values for all the arguments that need them at the same time.

## [Next](/3-guts-of-fp/partial-application)
