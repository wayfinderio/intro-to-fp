---
title: Now Wait Just A Minute
category: Welcome to Functional Programming
order: 3
---

### Let's recap

- Values are data that never changes
  - There are a few basic types, `Boolean`, `Number`, `String`
  - And a few composite types `Array` and `Object`
- We can declare variables and bind them to values
- These bindings never change (unless we use `let`, and that should be very rarely needed)
- Functions **always** have at least one argument and **always** produce a value
- That's about all we care about

You might be thinking that what I'm proposing goes something like this. So at one point I might have gone out and read through this:

![Javascript The Definitive Guide](/images/js_definitive_guide.jpg){:width="300px"}

_1096 pages_

And then someone came along and popularized the idea that maybe we didn't need all that and it would be a good idea to maybe just have this:

![Javascript The Definitive Guide](/images/js_good_parts.jpg){:width="300px"}

_176 pages_

Now you're telling me all I need is this:

![Javascript The FP Guide](/images/js_fp_guide.png){:width="300px"}

_5 pages_

You can't be serious.

### What is the point of this?

We've talked a bit about what a functional version of JavaScript looks like, but we haven't talked about why it might be this way. Seeing the differences may have brought up a lot of questions, this may even feel dumb or limiting. In the next section we'll dive into the motivation behind these decisions.
