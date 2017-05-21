---
title: End Of Day Project
category: Ramda
order: 1
---

It's been a heck of a ride so far, but now it's time to put what you've learned into practice. Building fold, filter, map, compose, and pipe was a great learning experience but it's time to move on to something a bit more industrial grade. For this project we're going to bring in the [Ramda](http://ramdajs.com/) library which provides all of the functions we crated and a whole lot more.

### Go forth and convert

You are free to use any code you might want to, but the idea is to take a non-trivial chunk of regular imperative JavaScript and give it the functional treatment. We've picked out an example of this [here](https://github.com/mzabriskie/axios/blob/master/lib/helpers/buildURL.js). The idea is not to port the lines 1-for-1 but to look at what is being done in the code and try to figure out how it would be accomplished with the kinds of pure composable functions we've been exploring.

This example task is ready to go at `exercises/end-of-day-one.js`.

To test your changes, run `npm run -s end-of-day-one` from the `exercises` directory.
