---
title: Detangling Functions
category: The Tenets of FP
order: 3
---

It is extremely common when learning about pure functions to want to go and apply the concept to an existing code base. While I applaud this enthusiasm, let's go over some of the common problems you will likely encounter.

### Intertwined effects and logic

Most functions are a mix of pure and effectful logic. You may find that you can factor out some of the pure parts into their own function. This can make very hard to test effectful code at least partially easier to deal with. You may also begin to see patterns in the effects you are doing as they tend to be very straightforward.

#### Pure code before effectful

{% highlight javascript %}
const fn = (param1, ..., paramN) => {
  const intermediateValue = use params + pure functions;
  doEffectfulThing(intermediateValue);
}

// becomes

const pureFn = (param1, ..., paramN) => use params + pure functions

const fn = (param1, ..., paramN) => {
  const intermediateValue = pureFn(param1, ..., paramN);
  doEffectfulThing(intermediateValue);
}
{% endhighlight %}

#### Pure code after effectful

{% highlight javascript %}
const fn = (param1, ..., paramN) => {
  const intermediateValue = doEffectfulThing(param1, ..., paramN);
  return (use intermediateValue + pure functions);  
}

// becomes

const pureFn = (param) => use param + pure functions

const fn = (param1, ..., paramN) => {
  const intermediateValue = doEffectfulThing(param1, ..., paramN);
  return pureFn(intermediateValue);
}
{% endhighlight %}

#### Pure code inbetween effectful

{% highlight javascript %}
const fn = (param1, ..., paramN) => {
  const intermediateValue = doEffectfulThing(param1, ..., paramN);
  const intermediateValue2 = use intermediateValue + pure functions;
  doOtherEffectfulThing(intermediateValue2);
}

// becomes

const pureFn = (param) => use param + pure functions

const fn = (param1, ..., paramN) => {
  const intermediateValue = doEffectfulThing(param1, ..., paramN);
  const intermediateValue2 = pureFn(intermediateValue);
  doOtherEffectfulThing(intermediateValue2);
}
{% endhighlight %}

### Exercise

Now it's your turn. Open `exercises/detangling-functions.js` in your editor of choice and extract out the parts that you can from the function.

To test your changes, run `npm run -s detangling-functions1` from the `exercises` directory.

When you are done there is a part 2.
