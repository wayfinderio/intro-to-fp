---
title: While We're At It
category: FP Idioms
order: 1
---

You won't get very far in most imperative languages without the humble `while` loop or one of it's variants such as `for`. Even though for loops are more commonly used, they are just syntactic sugar on while, so let's start there:

{% highlight javascript %}
  let i = 0;
  while (i < someEndValue) {
    // do something interesting here
    i++;
  }
{% endhighlight %}

While it's possible for `someEndValue` to be anything it's extremely common for it to be the length of a collection.

{% highlight javascript %}
  let i = 0;
  while (i < someCollection.length) {
    // do something with someCollection[i] here
    i++;
  }
{% endhighlight %}

This immediately brings up a problem, if we want to avoid mutating state, what useful thing could we do in the body of the while loop? While is not an expression, so we can't be returning a value. While demands that we mutate something inside the body, even if we are creating a new value each loop we're still rebinding the variable to a new value. This is as close to no-mutation as we can accomplish with while.

{% highlight javascript %}
  let numbers = [];

  let i = 0;
  while (i < 5) {
    numbers = [...numbers, i];
    i++;
  }
{% endhighlight %}

There is another construct that can be used to accomplish a looping structure but allows each "loop" to have its own scope. You may have never thought about `recursion` this way, but it's true!

{% highlight javascript %}
  const populateArray = (numbers, i, endValue) =>
    i < endValue
      ? populateArray([...numbers, i], i + 1, endValue)
      : numbers;
  }
  const numbers = populateArray([], 0, 5);
{% endhighlight %}

This may look more complex than the `while` example if you're not used to thinking recursively and using it in this manner. Hopefully though you see much of the operations we're performing are the same.

- `i < 5` is the same as `i < endValue`
- `[...numbers, i]` to add a value to the array is the same
- `i++` and `i + 1` both move the counter up one

Everything we could express in a while loop we can do via recursion and not need to mutate a variable along the way. With that said though, you probably don't write many while loops given there are constructs that more directly do what you want. Let's look at a few common cases.

#### Filter out unwanted values

{% highlight javascript %}
  const itemsToKeep = [];
  for (var i = 0; i < collection.length; i++) {
    if (collection[i] === someCriteria) {
      itemsToKeep.push(collection[i]);
    }
  }
{% endhighlight %}

#### Transform values creating a new collection

{% highlight javascript %}
  const newCollection = [];
  for (var i = 0; i < collection.length; i++) {
    newCollection.push(
      someOperation(collection[i])
    );
  }
{% endhighlight %}

If your language supports a `foreach` style iteration where the value itself is bound to a local variable instead of using an index, these could both be re-written in this manner.

Both these cases have a striking amount of similarity. Hopefully you've noticed this at some point as well. In fact, almost every line of each of these two cases are the same

  - `const itemsToKeep = []` is `const newCollection = []`
  - `for (var i = 0; i < collection.length; i++) {` is identical for both
  - `itemsToKeep.push` is `newCollection.push`

The only difference is that in the first case the item is conditionally added, and in the second, the item is processed before being added. This is the fundamental difference between the two operations, one filters out elements, the other maps one value to another. If the "when and what to insert" decision could be parameterized, then the rest of the code could be written once and not every time we need this construct.

### Higher Order Functions

To accomplish this feat we would need a function that could be parameterized by another function.

{% highlight javascript %}
  const doThing = (someFunction, someValue) => someFunction(someValue);
{% endhighlight %}

What are `someFunction` and `someValue`? No idea! Here's a function that receives _another_ function as an argument and can use it to produce a return value. We can go in the opposite direction as well.

{% highlight javascript %}
  const makeFunction = () =>
    (thingToLog) => thingToLog + 1;

  const newFunction = makeFunction();
  newFunction(5); // 6
{% endhighlight %}

The first function does not need to have zero arguments, in fact it's often useful for it to have arguments since the function that is returned can see and reference those variables.

{% highlight javascript %}
  const makeAdder = (firstValue) =>
    (secondValue) =>
      firstValue + secondValue;

  const plusTen = makeAdder(10);
  const finalValue = plusTen(5); // 15
{% endhighlight %}

A function that receives another function as an argument, or returns a new function as a return value is known as a **higher order function**. This may not seem very useful at first, but let's apply the idea to the problem from before and see how this both helps eliminates the need for mutation of a variable, and solves a broad class of problems, all at once.

### Fold and Friends

For any while loop of the shape with the form:

- Initialize a new collection
- Iterate over existing collection
- Insert values into new collection

there is a generalized solution known commonly as `fold`, `reduce`, or `aggregate`.

Fold has the general shape of:

{% highlight javascript %}
  const newCollection = fold(thingToDoWithEachNewElement, initialNewCollection, collectionToIterateOver);
{% endhighlight %}

The `thingToDoWithEachNewElement` is a function that takes the working `newCollection` and adds a new element to it, by doing a if check in the case of a filter type operation, or by running the element through a function first as in the case of the map type operation.

#### Filter type operation
{% highlight javascript %}
  const filterFn = (element, collection) =>
    element === condition
      ? [...collection, element]
      : collection;
{% endhighlight %}

#### Map type operation
{% highlight javascript %}
  const mapFn = (element, collection) => [...collection, someOperation(element)];
{% endhighlight %}

And we could use these functions with `fold` in a more concrete setting:

{% highlight javascript %}
  const filteredValues = fold(filterFn, [], [3, 4, 5, 6]);
  const transformedValues = fold(mapFn, [], [3, 4, 5, 6]);
{% endhighlight %}

> This is generally the point where people's eyes glaze over as we begin to get a bit more abstract. Hang in there, it's definitely worth it!

### Exercise

Ready for a challenge? Open `exercises/oragami/src/index.js` in your editor and implement the fold function that can operate on arrays. Do this either using a for loop or using recursion (or try both).

To test your changes, run `node ../run.js` from the `exercises/oragami` directory.