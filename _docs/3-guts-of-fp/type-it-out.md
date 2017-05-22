---
title: Type It Out
category: The Guts of FP
order: 2
---

As we begin to work with functions that take functions, it can often be hard to keep everything straight in your head. I know I personally have a problem with that. In this situation, even in a dynamic language, it can be **really** useful to be able to talk about the types involved. Let's look at a way of describing types that we can use to discuss functions.

Consider the function:

{% highlight javascript %}
  const excitedNumber = (number) => number.toString() + "!";
{% endhighlight %}

What are the types of the input and output of this function? `Number` goes in, `String` comes out. If you're familiar with a C-style language you might write this signature something like this:

{% highlight java %}
  String excitedNumber(Number number) { return number.toString + "!"; }
{% endhighlight %}

While conventional, this is hardly a convenient way of looking at the type. First off, the return type is on the left, the argument types are all mixed in with the argument names and the function name itself. Instead, let's consider a way of writing a signature that just involves the types.

{% highlight javascript %}
  // Number -> String
  const excitedNumber = (number) => number.toString() + "!";
{% endhighlight %}

Here we're annotating in a comment that this function goes from a `Number` to a `String`. Let's take a look at a multi-argument function.

{% highlight javascript %}
  // Number -> String -> String
  const numberWithSuffix = (number, suffix) = number.toString + suffix;
{% endhighlight %}

Although unfamiliar looking, hopefully you can agree that the comment style of type signature is far easier to pick out than it would be intermixed with the rest of the function bits. Let's apply this style to a more complex type, such as `String.split` from the JavaScript standard library. This function takes a separator pattern and splits the String wherever the separator appears, returning an array of all the pieces.

{% highlight javascript %}
  'hi_there_everyone'.split('_') // ['hi', 'there', 'everyone']
{% endhighlight %}

This function is on the prototype of String and so it implicitly takes the String as the _this_ argument. That means, `split` takes a `String` (the String to split), another `String` (the pattern to use to do the split), and returns an `Array` of `String`. We can write this signature as:

`String -> String -> Array String`

If you're familiar with generics from C++, Java, C#, TypeScript, or Flow you could read `Array String` as `Array<String>`. Since we have the `->` to separate arguments the extra `<` and `>` are unnecessary. I know this is all very unfamiliar but give it a chance. Remember we're learning Mandarin, not Spanish.

We're getting closer to having the right parts to put a type on the fold function from before. That function operated on Arrays which we've seen how to write, but the Arrays that fold operated on weren't necessarily filled with Strings, in the example they most certainly were **not** filled with Strings. If you've familiar with the aforementioned generics you've likely encountered this sort of thing before. In those languages we might write a function that operates on an Array that can hold any type as `Array<T>`. In this system that would be `Array t`. Notice the lower case letter to represent a generic type. It's also conventional to use `a`, `b`, `c`, etc. instead of `T` or `E` as is common in C# and Java.

{% highlight javascript %}
  // element -> colors  -> result
  //    a    -> Array b -> Array b
  const extractColor = (element, colors) => [...colors, element.hexValue]
{% endhighlight %}

The last thing to look at is how to represent functions that are provided as arguments or returned. This is very straightforward, simply surround the types that are part of the function in parens. So if you had a function, that as the first argument took another function that combined two Strings, and then as a second argument took a String, then as a third argument took a second String and finally returned a String, that signature would be:

{% highlight javascript %}
  // (String -> String -> String) -> String -> String -> String
  const stringCombiner = (combineFn, first, second) => combineFn(first, second);
{% endhighlight %}

If the function was returning a function instead:

{% highlight javascript %}
  // String -> (String -> String)
  const combineStrings = (thing1) =>
    (thing2) => thing1 + thing2;
{% endhighlight %}

Ok now we're ready to tackle `fold`.

{% highlight javascript %}
  //          fn               ->   init  ->  array  -> result
  // (a -> Array b -> Array b) -> Array b -> Array a -> Array b
  const fold = (fn, init, array) => { ... }
{% endhighlight %}

Wowza. That is quite a type signature, and probably not something you're used to seeing. If this seems a bit intimidating don't worry, it is to everyone the first time they see it. Hopefully though you can also see how clear the type signature is, it captures exactly what's going on, even with higher order functions and Arrays that are going from one element type to another.

We'll be using type comments from here on out to make clear what's going on.

### Exercises

Write out type signatures for the following JavaScript functions. If the type is on a prototype, then consider the prototype's object to be the first argument as we did with split.

- String.repeat
- String.charAt
- Number.parseInt
- Number.isNaN
- Map.has
- Array.slice
- Array.push

## [Next](/3-guts-of-fp/swiss-army-knife)
