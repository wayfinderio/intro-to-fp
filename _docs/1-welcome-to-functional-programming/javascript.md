---
title: Introducing JavaScript
category: Welcome to Functional Programming
order: 2
---

This course does unfortunately rely on you knowing a bit of JavaScript. This is necessary in order to draw a contrast between how things are done idiomatically in JavaScript and the approach that functional programming would rather take. Sometimes these are very compatible but more often they are not. The following section describes a JavaScript that we will eventually use, but on the way there, we will use several JavaScript language features such as [for loops](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for) and prototype function calls, for example [String.split](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/split). In addition we will occasionally look at code that utilizes the Node [require](https://nodejs.org/api/modules.html) syntax which is a way to gain access to code written in a different file, which in Node parlance are called "modules".

### JavaScript essentials

Welcome to JavaScript, a dynamically typed programming language that runs in web browsers and on the desktop via the Node runtime. There are four key concepts and two syntactic forms that you must learn to be able to use JavaScript. The concepts are `values`, `types`, `variables`, and `functions`, the syntactic forms are `if` and `for`.

### Values and Types

A value is what we call data in a program. Values are very simple, they simply are. They can be calculated using other values or declared directly. Values do not change, _they are always the same_.

`5` is a value, so is the text `hello, world!`.

Values represent data of a certain shape, known as a type. A type determines how many values there are of that type. For the `Boolean` type there are only 2 possible values, `true` and `false`. For every other built-in type there are many more possibilities. For `Number` every number between `-9007199254740991` and `9007199254740991` is a possible value (up to the limitations of floating point precision). That's 15 orders of magnitude more possible values. `String` is the type of textual data and can have an arbitrary number of values, up to the limitations of your computer's memory. Strings are represented with either single or double quotes around them to distinguish them from variables.

`true` and `false` are the only two values of `Boolean`.

`5` is a value of type `Number`, so is `-471231`, and `0.00123178912`.

`"hello, world"` is a value of type `String`, as is `'thisreallylongbitoftext'`, and even total gibberish such as `"alsdjf;lkaj;ejswaifjad$*l!skj3"`.

---

#### Arrays

Beyond these few built-in types, the other two types are composite, in that they glue together one or more of these "primitive" types.

The `Array` type holds zero or more values of any type. Arrays are surrounded by square brackets `[` and `]`.

`[1, 2, 3]` is a value of type `Array` that contains 3 values of type `Number`.

`['test', false, 99]` is a value of `Array` that contains 3 values of differing types, `String`, `Boolean`, and `Number`.

We can get values out of an array using an index. Indexes start at zero.

{% highlight javascript %}
  //               0       1     2
  const stuff = ['test', false, 99];
  const justTheNumber = stuff[2];
{% endhighlight %}

To get the third value out of the `Array` use index 2 since that is the third number when you start counting from 0.

#### Objects

The `Object` type (also called `Record`) is a collection of mappings from a `String` (called a field or property) to a value of any type. Objects are delimited by curly brackets `{` and `}`. Objects are often used to describe a bundle of related values.

{% highlight javascript %}
  {
    name: 'User name',
    userId: 123,
    accountType: 'owner'
  }
{% endhighlight %}

This is a value of type `Record` with three fields, `name`, `userId`, and `accountType`. You can use the names of fields in an `Object` to retrieve the associated value. There are two equivalent ways to do this.

{% highlight javascript %}
  const userRecord = {
    name: 'User name',
    userId: 123,
    accountType: 'owner'
  }

  const id = userRecord['userId'];
  const id = userRecord.userId;
{% endhighlight %}

### Variables

A variable is association of a name to a value. The `const` keywords binds a name to a value. A semicolon is used at the end of the line to signal the completion of the expression. The value bound to a variable may be declared on a single line or multiple lines.

{% highlight javascript %}
  const aNumber = 5;
  const areWeHavingFun = true;
  const currentUser = { name: 'Julius', userId: 100, accountType: 'PontifexMaximus' }
  const favoriteThings = [ 'raindrops on roses', 'whiskers on kittens', 'bright copper kettles', 'warm woolen mittens', 'brown paper packages tied up with string' ];
{% endhighlight %}

Nonsensical as it may seem, it is common to try to re-bind or re-associate a variable with a new value. This cannot be done with const, but in some rare cases it may be necessary. The `let` keyword allows this.

{% highlight javascript %}
  let valueThatWillChangeOutFromUnderneathUs = 'the times';
  valueThatWillChangeOutFromUnderneathUs = 'they are a-changing';
{% endhighlight %}

### Functions

Functions are a special kind of value that can be used to produce a new value. Every function has at least one input, called an argument, and produces exactly one resulting value. They are bound to a name just like any other value.

{% highlight javascript %}
  const makeTheLogoBigger = (logoSize) => logoSize + 1;
{% endhighlight %}

{% highlight javascript %}
  const sum = (a, b) => a + b;
{% endhighlight %}


The name(s) inside the parentheses are the arguments (aka inputs), and the result of the expression is the resulting value. If there is only one argument, the parentheses are optional.

Functions can be used by applying them to values. For example, if we wanted to use `makeTheLogoBigger` to a value bound to the variable `logo` we could do that like this:

{% highlight javascript %}
  const originalSize = 5;
  const newLogoSize = makeTheLogoBigger(originalSize); // 6
{% endhighlight %}

Occasionally you will need to do more than one thing in the process of producing a result from a function. Often this involves creating intermediate values. In this case you can add curly braces to the body of the function. You will also need to put `return` in front of the value that will be handed back from the function.

{% highlight javascript %}
  const makeTheLogoBigger = (logoSize) => {
    // do something here first
    return logoSize + 1;
  }
{% endhighlight %}

### Making decisions

While not a key concept we're not going to be able to get away from needing to know the syntax for how to make a decision. There's really not a good way to make this into a function without awkward syntax.

{% highlight javascript %}
  const result = condition ? ifTrue : ifFalse;

  const answer = x > 3 ? "YES!" : "Nah";

  // Whitespace isn't significant here. In the following sections we'll typically write this multiple lines:

  const answer = x > 3
    ? "YES!"
    : "Nah";
{% endhighlight %}


### Iteration

Although not required for our purposes, much JavaScript code utilizes a looping construct known as for. We will need to understand `for` so that we can draw a distinction between it and other ways of accomplishing the same thing.

The primary purpose of `for` is to repeat a block of code multiple times with a variable that will change on each iteration. This variable is conventionally called `i`.

{% highlight javascript %}
  for (let i = 0; i < 10; i++) {
    // do something here, each time i will be 1 greater than the last time
  }
{% endhighlight %}

There is another variation of `for` that iterates over a collection and provides each element of the collection instead of a number.

{% highlight javascript %}
  const collection = ['hi', 72, false];
  for (let value of collection) {
    // value will be 'hi' on the first iteration, then 72, then false
  }
{% endhighlight %}

## [Next](/1-welcome-to-functional-programming/now-wait-just-a-minute)
