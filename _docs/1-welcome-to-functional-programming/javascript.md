---
title: Introducing JavaScript
category: Welcome to Functional Programming
order: 2
---

Welcome to JavaScript, a dynamically typed programming language that runs in web browsers and on the desktop via the Node runtime. There are three key concepts that you must learn to be able to use JavaScript, `values`, `types`, `variables`, and `functions`.

#### Values and Types

A value is what we call data in a program. Values are very simple, they simply are. They can be calculated using other values or declared directly. Values do not change, _they are always the same_.

`5` is a value, so is the text `hello, world!`.

Values represent data of a certain shape, known as a type. A type determine how many values there are of that type. For the `Boolean` type there are only 2 possible values, `true` and `false`. For every other built-in type there are many more possibilities. For `Number` every number between `-9007199254740991` and `9007199254740991` is a possible value (up to the limitations of floating point precision). That's 15 orders of magnitude more possible values. `String` is the type of textual data and can have an arbitrary number of values, up to the limitations of your computer's memory. Strings are represented with either single or double quotes around them to distinguish them from variables.

`true` and `false` are the only two values of `Boolean`.

`5` is a value of type `Number`, so is `-471231`, and `0.00123178912`.

`"hello, world"` is a value of type `String`, as is `'thisreallylongbitoftext'`, and even total gibberish such as `"alsdjf;lkaj;ejswaifjad$*l!skj3"`.

---

##### Arrays

Beyond these few built-in types, the other two types are composite, in that they glue together one or more of these "primitive" types.

The `Array` type holds zero or more values of any type. Arrays are surrounded by square brackets `[` and `]`.

`[1, 2, 3]` is a value of type `Array` that contains 3 values of type `Number`.

`['test', false, 99]` is a value of `Array` that contains 3 values of differing types, `String`, `Boolean`, and `Number`.

##### Objects

The `Object` type (also called `Record`) is a collection of mappings from a `String` (called a field or property) to a value of any type. Objects are delimited by curly brackets `{` and `}`. Objects are often used to describe a bundle of related values.

{% highlight javascript %}
  {
    name: 'User name',
    userId: 123,
    accountType: 'owner'
  }
{% endhighlight %}

This is a value of type `Record` with three fields, `name`, `userId`, and `accountType`.

#### Variables

A variable is way of associating a name with a value. The `const` keywords binds a name to a value. A semicolon is used at the end of the line to signal the completion of the expression. The value bound to a variable may be declared on a single line or multiple lines.

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

#### Functions

Functions are a special kind of value that can be used to produce a new value. Every function has at least one input, called an argument, and produces exactly one resulting value. They are bound to a name just like any other value.

{% highlight javascript %}
  const makeTheLogoBigger = (logoSize) => logoSize + 1
{% endhighlight %}

{% highlight javascript %}
  const sum = (a, b) => a + b
{% endhighlight %}


The name(s) inside the parentheses are the arguments (aka inputs), and the result of the expression is the resulting value. If there is only one argument, the parentheses are optional.

Functions can be used by applying them to values. For example, if we wanted to use `makeTheLogoBigger` to a value bound to the variable `logo` we could do that like this:

{% highlight javascript %}
  const newLogoSize = makeTheLogoBigger(logo);
{% endhighlight %}
