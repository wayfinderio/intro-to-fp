---
title: Paramecitry Pop Quiz
category: Abstraction
order: 2
---

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

> Many languages like Idris and language extensions like Liquid Haskell allow us to write simple proofs of our functions and types, these guarantees are very strong and a very active area of research in language development.
