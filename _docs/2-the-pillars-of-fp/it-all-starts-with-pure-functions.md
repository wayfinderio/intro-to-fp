---
title: It All Starts With Functions
category: The Tenets of FP
order: 1
---

### The ideal function

If you were to imagine the properties you wanted every bit of code you ever had to work with for the rest of your life to have, what would you say? Would you want it to be written in a familiar language? Perhaps the formatting would be perfect and it would be thoroughly commented? Would every function be no more than 10 lines long? 5 lines? Would it be "elegant" (whatever that means), or some other vague sentiment about maintainability? Would it be easy to test, easy to change?

Now what if you could only pick one property, what would it be? Think about this for a moment, what is the single most important property you could ascribe to "good" software? Does such a thing even exist?

Functional programming is based on the idea that the ideal property for all software is that it is built out of `pure` functions _to the maximum extent possible_. "Pure function" may be a brand new term to you although I'm certain you've written many pure functions yourself. All it means to be a pure function is the following:

> Always produces the same result given the same arguments

Which implies

- Always has at least one argument
- Always produces a result
- Pure functions can only use other pure functions
- Could be replaced by a lookup table

#### Lookup tables
The last bit can be slightly confusing, so let's dig into that a bit. Imagine the function
{% highlight javascript %}
  const negate = (boolValue) => !boolValue;
{% endhighlight %}

If we were to record every input and the corresponding output, we would get the following:

| boolValue | result |
| --- |
| true | false |
| false | true |

Now consider another function

{% highlight javascript %}
  const plus1 = (number) => number + 1;
{% endhighlight %}

| number | result |
| --- |
| 0 | 1 |
| 1 | 2 |
| n | n + 1 |

It is clearly impractical to write out every possible input and output, but you can see that it would be possible to do so.

Now consider the following function

{% highlight javascript %}
  const getThings = (query) => doQuery(query);
{% endhighlight %}

| query | result |
| --- |
| select * from someTable | ? |

Where would we even start? Does `doQuery` always return a valid result? Would it be the same result every time or could it be different given the exact same query? Given that it is likely a database system, it would be a rather **bad** database if it always gave back the exact same result to a query. In that situation it could be replaced by something _much_ simpler.

#### Effects

Some people refer to functions that are not pure as "impure", but I prefer the term effectful because it goes to the heart of the distinction. Pure functions by definition have no impact on the state of a program. You could apply it 0, 1, or 10,000 times and there would be no way to tell.

Using pure functions _to the maximum extent possible_, does not mean _built entirely out of pure functions_. The equivalent of `main` in your application will almost certainly be effectful, and that's ok! Effectful functions are like super functions, they can do everything a pure function can do **AND** all that stuff pure functions cannot. This means effectful functions can use pure functions and this doesn't interfere with the pure functions staying pure. Now a pure function used in this way still can't turn around and use an effectful function.

> Effectful => Pure => Pure

This is ok, effectful functions can user pure functions, and pure functions can user pure functions

> Effectful => Effectuful => Pure

This is ok, effectful functions can use effectful functions

> Effectful => Pure => Effectful

This is not ok, pure functions cannot use effectful functions (without themselves becoming effectful)

So a typical `main` function uses a combination of pure and effectful functions to set up everything your application needs to run. The effectful functions generally exist at the borders of your application, reading and writing files, responding to network requests, talking to the database, etc. This is sometimes known as `imperative shell, functional core`, from the talk [Boundaries](https://www.destroyallsoftware.com/talks/boundaries) by Gary Bernhardt.

One slightly mind blowing aspect of pure functions is that absolutely every bit of logic in your application can be expressed in terms of a pure function. Don't believe me? Think about it for a moment. What is an example of a decision your application must make that directly involves an effect? Sure you may currently have application logic and effects intermingled, but they **could** be separated. If your logic needs the result of an effect, you could perform the effect first, then pass the result into the pure function to produce a result. If you can think of a counter-example I'd be very curious to [hear about it](mailto:david@wayfinder.io).

### Ok, so what does this buy us?

- Easiest conceivable code to test
- Guaranteed to not effect other parts of the program
- Refactoring is a snap
- Can safely combine with other pure functions ad infinitum
- 7 +/- 2<sup>1</sup>
- Simpler code<sup>2</sup>

### And what did this cost?

- Can't mix pure and effectful bits together, they must be separate functions
- Potentially harder code<sup>2</sup>

### <sup>1</sup> Mental Capacity

Have you ever heard of the rule for how many things a typical person can keep in their head. Made famous by George Miller [in a 1956 paper](http://psychclassics.yorku.ca/Miller/) it's generally agreed to be around 7 +/- 2. I like to think of this in terms of juggling. I a top notch individual can juggle 9 objects, then a pretty lackluster person can handle at best 5. That's a fairly sizeable gap, but surprisingly not nearly as big as we see in other aspects of human performance.

I'd bet good money there are a good number of people who can run way more than 80% faster than I can over some non-trivial distance. There are plenty of people who can solve a crossword puzzle more than 80% faster than I can. And with the enduring popularity of crossfit, there are a great many people who can lift more than 80% more than I can.

Thinking back in terms of mental capacity, if I'm at the bottom of the distribution, and you're at the very top, it doesn't take much to equalize us. Having an argument with your significant other? Concerned you'll be passed over for a promotion? Maybe you had a fantastic date last night? You just got a big bonus and want to put it to good use? It's not hard to rack up a few non-work related objects (positive or negative) you're keeping in the air.

Now consider what we deal with just in our work. Application state? Side effects? The structure of your data? The changes a coworker is making to a related part of the application? The new feature you plan to implement next? The null reference exception that just caused the app to crash? Just within the realm of our direct work it's easy to use up your juggling ability with semi-irrelevant objects. Some days it feels like most of what I'm juggling is strange mutations to my state, null reference exceptions to values that shouldn't be null, and functions I have to dig into layer by layer to understand what they're actually doing.

Personally I want to banish as many things as possible from this situation as is practical. If a certain problem can't exist, then I'll never find myself juggling it. Some people say they're not smart enough to do functional programming. I say I'm not smart enough **not** to do functional programming.

### <sup>2</sup> Simple vs Easy

I'd like to make a distinction between two words that are often used interchangeably. This very specific definition comes from Rich Hickey, the creator of the [Clojure](https://clojure.org/) programming language in a talk titled [Simple Made Easy](https://www.infoq.com/presentations/Simple-Made-Easy).

> The TL;DR is that there are two orthogonal axes at play, Simple <-> Complex and Easy <-> Hard.

#### Simple

Simple and complex refer to the degreed to which something is entangled or intertwined with another. Simple and complex are objective judgements. A bunch of spools of thread on a loom are totally independent and can be swapped out, removed, etc. Once the loom goes to work and the thread is woven together into material, those individual threads are now intertwined with each other. What was simple is now complex. You tend to have more things when they are simple, 20 spools of thread is a lot more things than 1 rug.

#### Easy

Easy and Hard by contrast are subjective judgements. You may find playing guitar, riding a unicycle, pointer arithmetic, or speaking a language other than English easy, I do not. But I likely find several things easy that you would say are hard. Easy and hard change with practice and familiarity. There is also an element of "nearby" or "at hand" with easy. It is easy to pick up a tool sitting on the desk in front of you, less easy to pick it up across the room, and downright hard to pick it up in another state. Easy things tend to be complex, since bundling up a bunch of stuff together can put them more "at hand". A large framework with functionality out of the box that does many things can often be very easy to use, but it is most definitely not simple.

#### Implications

Generally when people dislike a new language or tool, it's because it is hard, not because it is complex. This is a bad tradeoff. Hard things become easy, complex things stay complex. Pure functions are by definition simple, and effectful functions are by definition complex. Building as much of our application out of pure functions keeps it as simple as possible, **but in the short term may make writing programs harder.**

### Terms

- Effectful: Causing an observable change in the state of the application or greater computing environment
- Imperative: A style of programming where lines of source code are implicitly ordered temporally. This is often a necessity as many of the commands in imperative languages can result in effects and thus must be performed in a strictly specified order.
