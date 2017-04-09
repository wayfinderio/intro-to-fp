---
title: Let's Get Parametric
category: Abstraction
order: 1
---

In the pursuit of reasoning we've changed a lot about how we approach code. Now I'd like to take a look at the impact that purity plus types can have on our ability to reason about our programs.

{% highlight elm %}
  foo : Bool -> Bool
{% endhighlight %}

What can we say about this function?

How many implementations might there be for it?

---

{% highlight elm %}
  foo : Int -> Int
{% endhighlight %}

What can we say about this function?

How many implementations might there be for it?

---

{% highlight javascript %}
  foo : a -> a
{% endhighlight %}

What can we say about this function?

How many implementations might there be for it?

### My kingdom for `a` insight

Usually the answer is either "infinite" or "one".

The key insight here is that we know absolutely nothing about `a`. What operations can you do on a type you know nothing about? There are no such operations (there is no base class from which to inherit `.equals` or `.toString`). Given that we know nothing about `a` and there are no operations that work on every type (well except the one we're defining), there's only one thing this function could possibly do. Return the `a` that it is given.

{% highlight elm %}
  id : a -> a
{% endhighlight %}

> We sort of glossed over this before, relating the concept to Java/C# generics but in the domain of functional programming having a generic type parameter(s) is called parametric polymorphism instead of generics.

This idea of "there's only one thing we could possibly do" relates back to the idea of abstraction.

![Edsger Dijkstra](/images/abstraction-dijkstra.jpg)

Abstraction is not:

- Wrapping up code into a library
- Adapters
- Information hiding
- Being vague

Abstraction is about reducing discarding all unessential information so only the single idea that is being represented remains.

![Triangle](/images/GeometryArea.svg)

From this triangle diagram we can't determine the triangle's height, area, what the angles are, even the ratio of the base to the height. None of that matters though since this abstraction is about the relationship between a triangle and a rhombus that is twice its area. From that we can deduce that a triangle's area is `1/2 base * height`.

> It's fairly common for people to complain about "leaky abstractions". These are not proper abstractions as the above example demonstrates. If you wonder if there are any proper abstractions in software, ask yourself when was the last time you had to think about electron flows?

### Paramecitry++

What do we know about these:

{% highlight elm %}
  foo : a -> b -> a
{% endhighlight %}

[](#spoiler "It is returning the 'a' and ignoring the 'b'")

---

{% highlight elm %}
  foo : a -> a -> a
{% endhighlight %}

[](#spoiler "It is returning one of the a's, we don't know which, but it will always return the same one")

---

{% highlight elm %}
  first : List a -> a
{% endhighlight %}

[](#spoiler "The first function doesn't know what 'a' is, therefore it can't do anything to the values in the List.")
[](#spoiler "What if the list is empty? first can't create a new value of type a, it doesn't know how. We know this function can't be correct, just from looking at it's type signature")

---

{% highlight elm %}
  foo : List a -> List a
{% endhighlight %}

[](#spoiler "All the values in the List that is returned were in the original List")

---

{% highlight elm %}
  foo : List a -> List a -> List a
{% endhighlight %}

[](#spoiler "All the values in the List that is returned were in one of the original Lists")

---

{% highlight elm %}
  foo : List a -> List b
{% endhighlight %}

[](#spoiler "The 'foo' function doesn't know what 'a' is, therefore it can't get a 'b' from an 'a'. We know this function can't be correct, just from looking at it's type signature")

---

{% highlight elm %}
  foo : (a -> b) -> List a -> List b
{% endhighlight %}

[](#spoiler "There is a function provided that will work with any 'a' and always produce a 'b'. All the values in the List that is returned were obtained by taking a value from the input list and running in through the (a -> b) function.")
[](#spoiler "By the way, this function is 'map'")

### What's the point?

We've asserted quite a few things in this section, without looking at a single line of implementation code. The types tell us enough to reason a fair amount about our functions. There are even more techniques that allow us to take this reasoning much farther up to the point of being able to prove properties about our programs.

> Yes, many languages like Idris and language extensions like Liquid Haskell allow us to write simple proofs of our functions and types, these guarantees are very strong and a very active area of research in language development.
