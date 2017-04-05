---
title: Compose Yourself
category: FP Jitsu
order: 1
---

Remember a zillion years ago when we were discussing how awesome and simple functional programming is? You'd probably like to get back to more of that right? We'll you're in luck, because all that hard work you've put in is going to pay off here. Although much of what we've been discussing in unfamiliar, and therefore hard, it has retained a simplicity that is necessary for our next topic: composition.

In the previous section we saw lots of "fitting one function's type to fit the argument of another". Think of this process like Legos. Legos are amazing toys because apart from a few specialty pieces, they all compose with each other. That is, if you combine two bricks, you don't lose the ability to keep combining bricks. Pure functions have this same property.

Consider the following two functions:

{% highlight javascript %}
  const doSomething1 = (a, b) => a + b;
  const doSomething2 = (a, b) => console.log(a + b);
{% endhighlight %}

Apart from `doSomething1` being pure and `doSomething2` being effectful, what can we say about the function's ability to be used with other functions? Maybe having some types would help.

{% highlight javascript %}
  // Number -> Number -> Number
  const doSomething1 = (a, b) => a + b;
  // Number -> Number -> ()
  const doSomething2 = (a, b) => console.log(a + b);
{% endhighlight %}

So far we haven't really discussed what "void" would look like in a functional language. Typically something like `()` or `unit` gets used to represent the "I don't have any sort of actual value here" concept, but as a value and a distinct type. The only thing you really need to know about `unit` for now is that it's a value, but a value that conveys zero bits of information. `unit` is the only value of type `Unit`. We'll talk more about the role of null'esque things in the next section.

Getting back to our signatures, if I were to take the result of `doSomething1` and plug it into a function that was `Number -> String` would that work?

{% highlight javascript %}
  // Number -> Number -> Number
  const doSomething1 = (a, b) => a + b;

  // Number -> String
  const doSomething3 = (num) => num.toString();

  const result = doSomething3(doSomething1(1, 2));
{% endhighlight %}

This works marvelously! We take `Number -> Number -> Number` and we plug it into `Number -> String`. Because the last type in the first function matches the first thing in the second function we're in business. I'm certain you've done similar things in your own programming. Now consider `doSomething2`. Not many functions  are `() -> ...` so that function is effectively terminal and can't be combined with other functions that might want to follow it. Whenever you see the equivalent of `()` either in the argument position or the return value position, think about how that impacts the ability of that function to be combined with others.

### Getting Compositional

Ok, let's get to some examples of this composition thing. Unfortunately JavaScript doesn't have any sort of built-in function composition so we'll have to make it ourselves.

> For any real use you should really use one of the battle-tested versions from Ramda or Lodash.

{% highlight javascript %}
  const compose =
    (thisHappensFirst, thisHappensSecond) =>
      (...args) => thisHappensSecond(thisHappensFirst(...args));
{% endhighlight %}

This `compose` function takes in two functions and returns a new function that applies the arguments to the first, then feeds the result into the second and finally returns the result of the second. The `...args` bits are to collect an arbitrary number of arguments into a single value and then to spread them out again when passing them along to `thisHappensFirst`.

{% highlight javascript %}
  // Number -> String
  const excitedNumber = (number) => number.toString() + "!";

  // Array a -> Array a -> Number
  const longest = (numbers1, numbers2) => Math.max(numbers1.length, numbers2.length);

  // Array a -> Array a -> String
  const excitedAboutLongest = compose(longest, excitedNumber);
  const result = excitedAboutLongest([81,2,51], [6,4,12,1,8]) // "5!"
{% endhighlight %}

If you've been through algebra you might recall something that looked like this: `g	∘ f = g(f(x))`. In math, the ∘ means compose and it's where this idea comes from. As you can see, composing g with f is very similar to what we did for `thisHappensFirst` and `thisHappensSecond` except the order is backwards. Mathematical composition is from right-to-left, so you'll want to re-adjust yourself to this. Typically there is a flipped version, often named `pipe` that is left-to-right. Let's fix our function.

{% highlight javascript %}
  const pipe =
    (thisHappensFirst, thisHappensSecond) =>
      (...args) => thisHappensSecond(thisHappensFirst(...args));

  const compose =
    (thisHappensSecond, thisHappensFirst) =>
      (...args) => thisHappensSecond(thisHappensFirst(...args));
{% endhighlight %}

In most functional languages the compose operation will be built in, usually as an infix operator. In Elm and F# it's the `>>` or `<<` depending on if you want left-to-right or right-to-left composition. In Haskell the `.` is used. This can make for very expressive function composition.

```Elm
-- Elm / F#
newFunction = second << first
newFunction = first >> second

-- Haskell
newFunction = second . first
```

### Exercise

Now it's your turn to get composed. Open `exercises/composition/src/index.js` in your editor of choice and finish the definitions of `moar` using either `compose` or `pipe`. `moar` should utilize `a`, `b`, and `c`.

> Remember, compose and pipe both take 2 arguments.

To test your changes, run `node ../run.js` from the `exercises/composition` directory.
