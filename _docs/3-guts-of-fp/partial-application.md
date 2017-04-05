---
title: Partial Application
category: The Guts of FP
order: 4
---

What we're after here is a way to provide arguments one at a time and not have the function try to return a result (or get an argument error in something like Ruby or a compiler error in something like C# or Java).

If we were to re-write our functions slightly we could accomplish this task. Instead of this:

{% highlight javascript %}
  const thing = (first, second) => first + second;

  const result = thing(1, 2); // 3
{% endhighlight %}

We could write it this way:

{% highlight javascript %}
  const thing = (first) => (second) => first + second;

  const thingWith1Fixed = thing(1);
  const result = thingWith1Fixed(2); // 3
{% endhighlight %}

Applying a single argument and getting back another function is known as partial application. A function is fully applied (also known as saturated) when all of the arguments have been supplied and thus the inner-most function has evaluated to a result.

> When a lambda is declared, it can access any variables that are in scope at the time, this is know as a closure. So the inner-most function can see `first` and `second` and thus can perform all the work needed to compute the result.

If we were to look at the types of these two forms, they would be:

{% highlight javascript %}
  // a -> b -> c
  const thing = (first, second) => first + second;

  // a -> (b -> c)
  const thing = (first) => (second) => first + second;
{% endhighlight %}

Really what's been going on all along though is more like:

{% highlight javascript %}
// (a, b) -> c
const thing = (first, second) => first + second;
{% endhighlight %}

The `a` and `b` arguments here are not independent, you provide both of them at the same time and get back your result. The `a -> b -> c` form we've been using is really just the `a -> (b -> c)` in a world where every function only takes 1 argument. That isn't the reality in JavaScript but **is** in a lot of functional languages, including Elm. A function in this form, where it takes a single argument and returns a function that is the next argument is know as `curried form`.

### Partial Application Is Key

Partial application definitely takes some getting used to but it is very important in the FP toolkit. When every function is curried, it makes re-using it to get new functionality very straightforward. Think back to `String.split` which has type `String -> String -> Array String`. Let's say we had an Array of Strings and we wanted to split each one. This sounds perfect for `map`, except that `map` wants a function that is `a -> b` and we have a function that is `a -> a -> b`. In a world of partial application though this is not a problem at all, we'll partially apply `String.split` with the string `'-'` so that it goes from `String -> String -> Array String` to `String -> Array String` which fits perfectly into `map`.

{% highlight javascript %}
  const stringsToSplit = ['test-123', 'hi-there', 'nothingToSplitHere'];
  const splitStrings = map(String.split('-'), stringsToSplit);
{% endhighlight %}

### Exercise

Take the `map` function you wrote earlier and convert it into curried form. Since it has two arguments you'll be getting back a function after supplying the first argument. Remember to use two sets of parentheses.

{% highlight javascript %}
  const result = map(thingToDo)(arrayToDoItOn);
{% endhighlight %}

> It is very common to forget to split up arguments into separate parentheses. If you are getting mysterious errors about undefined values this may be the issue.

### Home stretch

Let's look at the filter function in curried form:

{% highlight javascript %}
  const filterFn = (someCondition) => (element) => (collection) =>
    someCondition(element)
      ? [...collection, element]
      : collection;
{% endhighlight %}

Now instead a single function that takes 3 arguments and returns the result, we have a function that takes 1 argument and returns a function that takes 1 argument that returns a function that takes 1 argument that returns the result. The type of this new function would look like this:

{% highlight javascript %}
  // someCondition  -> (element -> (collection -> result))
  // (a -> Boolean) -> (a       -> (Array a    -> Array a))
  const filterFn = (someCondition) => (element) => (collection) =>
    someCondition(element)
      ? [...collection, element]
      : collection;
{% endhighlight %}

It's now possible to plug in the custom filter logic and get back the shape we need to use with fold. Of course fold itself would need to be converted to curried form.

{% highlight javascript %}
  // fold is: (a -> Array b -> Array b) -> Array b -> Array a -> Array b
  // filterFn is: (a -> Boolean) -> a -> Array a -> Array a
  // filter is: (a -> Boolean) -> Array a -> Array a
  const filter = someCondition => collection =>
    fold(
      filterFn(someCondition))
      ([])
      (collection)
{% endhighlight %}

And there we are! Fold is the while loop of FP and all of the other variants you would expect such as filter and map can be expressed in terms of it. But what does this buy us? Well for one, the number of concepts we have stays pretty low. We still really just have fold with some specialized function stuck in there. For some important patterns it's worth thinking of them independently as we have with filter and fold. In fact, those three functions cover a tremendous number of use cases and you will see them all frequently in a FP language.

> If your brain doesn't hurt right now, you're probably doing it wrong.

### Practicalities In JavaScript

Now you may be saying, this seems slightly awkward in JavaScript and you would be right. JavaScript was not created with this use case in mind and doesn't exactly do us any favors here. For practical use of curried functions libraries such as [Ramda](http://ramdajs.com/) and [Lodash](https://lodash.com/) provide a `curry` function that takes a regular function and converts it, while still allowing you to provide as many arguments as you want. If you provide less than the function has, you'll get back the intermediate function, otherwise you'll get the result. This sort of thing isn't necessary in languages such as F#, Elm, Haskell, OCaml, PureScript, or Reason where all functions are automatically curried and all the `foo(a)(b)(c)` type application is handled for you when you do `foo a b c`.
