---
title: Let's Be Reasonable
category: The Tenets of FP
order: 4
---

The big idea of using pure functions as much as possible brings with it brought some benefits that all hinted towards an overall ideal. If you remember from before we had

- Easiest conceivable code to test
- Guaranteed to not effect other parts of the program
- Refactoring is a snap
- Can safely combine with other pure functions ad infinitum
- 7 +/- 2
- Simpler code

All of these properties speak to a common feature of code written this way, it is easy to know, with certainty what it will not do. Pure functions unfortunately do not help you understand why some code is written the way it is, or what it was intended to do, but while you're pondering over that you can rest assured it's not mutating global state, or firing off side effects. Functional programmers generally refer to this idea as being _easy to reason about_.

Reasoning about our programs is a big deal, after we spend a lot of time time reading code and trying to understand it, even code that we wrote ourselves 2 weeks ago. Although data on this topic is often anecdotal your experience has hopefully given you the same impression. I find myself reading a **lot** more code than I write, especially when trying to understand the implications of a fix or change. If I'm working with effectful functions, I have to trace down through each of those functions to see what they do, and on, and on until it finally bottoms out. If I'm dealing with pure functions often I do not need to go down that path. _Easy to reason about_ is like a promise that you're only going to juggle the balls you absolutely must, no unnecessary stuff thrown in there.

The rest of our exploration of functional programming ideas will be motivated by this pursuit of _easy to reason about_.

### Terms

Some other terms that relate to reasoning you might have heard:

- Referential transparency: The ability to replace a function application with its result. This is the "could be replaced with a lookup table" property.
- Equational reasoning: The ability to take a function and inline it wherever it is used without changing the meaning of the program. This is very helpful when understanding how new code works and is also frequently used when constructing proofs. The inverse property, the ability to extract any bit of code into a function aids considerably when refactoring.
