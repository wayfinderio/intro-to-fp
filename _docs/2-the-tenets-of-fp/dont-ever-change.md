---
title: Don't Ever Change
category: The Tenets of FP
order: 5
---

### The State of State

A never-changing state is pretty easy to reason about. A never-changing state is also totally useless outside of configuration data or some other static source of truth such as a `sin` / `cos` lookup table. Our applications are full of wonderful complex data swirling around, responding to user interaction and the application's own logic. The downside to this state of affairs is that it is pretty much the opposite of _easy to reason about_.

So what's a functional programmer to do? The good news is we already have an answer. A change to state is an effect, and we know that while effects make our lives harder, they're a useful and necessary part of any application. We just need to keep the changing of state to a minimum and constrain it to the effectful parts of our program.

For the vast majority of use cases, we don't actually need to be mutating any state. If you remember from before the term `value` was brought up as data that doesn't change. If we are working with values then there's no issue of state changing. Furthermore, pure functions demand values in that you cannot reasonably call a function pure if some data that is provided as an argument gets mutated while it is being evaluated.

Most of the data we work with at the bottom-most level exhibit this "value" property. Numbers, strings, booleans are all unchangeable. So why is is that anything container'ish is seen as naturally mutable?

{% highlight javascript %}
  const x = 5;
  x = 6; // error!

  const y = [1, 2, 3];
  y[0] = 999; // okie dokie, no problem here
{% endhighlight %}

This leads to some seemingly strange situations.

{% highlight javascript %}
  const x = 7;
  const y = 7;
  x === y // true

  ... arbitarary amounts of code ...

  x === y // still true
{% endhighlight %}

{% highlight javascript %}
  const x = [7];
  const y = [7];
  x[0] === y[0] // true

  ... arbitarary amounts of code ...

  x[0] === y[0] // can't be sure
{% endhighlight %}

Part of this has to do with the differences between "value semantics" and "reference semantics". There are two ways of looking at equality in JavaScript, one is that two bits of data are logically equal, the other is that if two bits of data occupy the same spot in memory, they are equal. You would expect that `5` is equal to `5` and that `"hi"` is equal to `"hi"`, but what about '[1, 2, 3]' being equal to `[1, 2, 3]`? Why is `5` different from `[1, 2, 3]`? In the first case, JavaScript has special rules about Numbers, Strings, and Booleans. These are generally referred to as `value types` because equality is always determined by the value at the memory location where they are stored, and not their position in memory. By contrast, Objects and Arrays are `reference types`, and are compared by memory location (when using `===`). This sets up a strange contrast, where some bits of data can always be compared, but others, although logically the same, cannot.

{% highlight javascript %}
  const x = [1, 2, 3];
  const y = [1, 2, 3];
  x === y // false

  const z = x;
  x === z // true
{% endhighlight %}

{% highlight javascript %}
  'hello'.replace('o', 'a') === 'hello'.replace('o', 'a') // true
  [1, 2, 3].splice(1, 1, 99) === [1, 2, 3].splice(1, 1, 99) // false
{% endhighlight %}

So how did we get here? What made this the default way of doing things? There are two major forces that shaped the current state of affairs: variables as aliases to memory locations, and in-place updates.

### Variables As Aliases To Memory Locations

In the beginning, there were no variables. Just hexadecimal (or octal, or another now arcane addressing system) addresses. This allowed a programmer to write some bits on top of whatever previously existed at a given memory address. Eventually this concept was abstracted to something we now call `variables`. This borrowed the term from mathematics, except they weren't anything like math variables. Instead, a variable in an imperative programming language is merely an alias. This is fairly transparent in languages like C, but much less so in languages that are garbage collected such as Java, Ruby, Python, JavaScript, C#, Lua, and R. Even if there is a system managing where in memory the alias is pointing, the fact remains that the variable is simply a glorified memory address.

This explains why it's so easy to know if two arrays are exactly the same object, because they have the same memory address, and comparing them compares this address. Comparing if two arrays are the same value, is a much harder proposition. Since the bits of memory that make up the array can be changed at any time, it's not so easy to know if an array that started off with the same data inside has changed. Realistically the only way to know is to go through every element in both arrays and see if the data at each index is the same. Ugh. The semantics of a variable as a name that points to memory that can be overriden by a myriad of operations destroys any ability to know efficiently what the value of that array is.

### In-Place Updates

The indexes of an array and the properties of an object are, under the hood, merely offsets into a data structure located at wherever the array/object variable points. When you say `foo.baz = 5;` you're looking up a memory location pointed to by `foo`, then moving an additional offset to wherever `bar` refers to inside that data structure and finally writing a `5` there.

|**Address**|
|0x100|0x110|0x130|
|**Alias**|
|foo|.bar|.baz|
|**Value**|
|10|10|7|
|**New value**|
|10|10|5|

This idea of writing to memory by variables and offsets also goes back to C and is very transparent when using it. Just like with aliases, this is what's happening in any garbage collected language, it's just not as obvious. This makes it very efficient to update just a tiny portion of memory and to re-use memory over and over to keep the overall memory usage of an application to a minimum. These are certainly very important considerations but they come at a cost. The ability to explicitly perform in-place updates destroys any ability to rely on the data referenced by variables to act as a value.

### Value Only Programming

If you're not convinced of the problems with references, I would suggest [The Value of Values](https://www.infoq.com/presentations/Value-Values) by Rich Hickey (again of Clojure fame). If you are, (or can bear to just go with it), then let's continue forward into the world of value only programming.

The first thing we have to confront when programming with values is that we're going to **conceptually** make a new value every time we want to change some data. So if you have an array with 10,000 elements and you want to add 1 more, you're going to still have that original array, and now a second array with 10,001 elements. Again, this is what we're going to have **logically/conceptually/semantically** it does not mean the underlying implementation needs to be done this way. You certainly _can_ make a copy of the entire array, and for small objects this may be a very acceptable solution, for large data structures it probably is not.

In languages designed with functional programming programming concepts in mind, there are only values, and not references. Under the hood the language can use whatever machinery is available, often compiling to a subset of C before producing a binary, but maintaining value semantics within the language. In JavaScript we do not have a language to do this for us, and instead must work with the system that we have. If we desire for everything to be a value, this can be by conventions, simply do not utilize any functions that are capable of mutating data and always creating new values. Eslint plugins such as [Immutable](https://github.com/jhusain/eslint-plugin-immutable) can help you spot when you might be performing mutation. The other approach is to use a system that enforces some degree of immutability. The [Immutable.js](https://facebook.github.io/immutable-js/) library is an example of such a system. Both these approaches are somewhat awkward in a language that doesn't consider immutability a first class feature. Some new language features such as the spread operator do lessen the burden of creating new values, but immutability is generally the most awkward part of using any non-functional language in a functional way.

#### Creating New Values

For non-value types that you want to treat as a value, you will need to create new versions each time you make a change. The spread operator that is available via the Babel transpiler makes this task much easier.

{% highlight javascript %}
  const numbers = [83, 21, 66];
  const newNumbers = [...numbers, 24]; // [83, 21, 66, 24]

  const obj = {
    a: 5,
    b: 'hey',
    c: {
      d: false
    }
  };

  const newObj = { ...obj, b: 'yo' };
  // {
  //   a: 5,
  //   b: 'yo',
  //   c: {
  //     d: false
  //   }
  // };
{% endhighlight %}

This lacks the efficiency gains that can come from using a library such as Immutable.js as it will duplicate the entirety of the array and only make a shallow copy of the object, however it is dramatically simpler and we will use this style throughout the rest of this course. For more advanced use cases such as needing to perform a deep copy of an object there are many utility libraries such as [Ramda](http://ramdajs.com/) and [lodash](https://lodash.com/) which have this functionality.

### Exercise

Now it's your turn. Open `exercises/changing-state1.js` in your editor of choice and make the failing tests pass.

To test your changes, run `npm run -s changing-state1` from the `exercises` directory.

When you are done there is a part 2 and 3.

## [Next](/3-guts-of-fp/while-we-are-at-it)
