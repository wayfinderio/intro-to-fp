---
title: An exceptional approach
category: FP Jitsu
order: 3
---

> Since JavaScript doesn't have a static type system and this topic is really best explored in that context we're going to deviate into C# for a bit.

What is the type of this function?

{% highlight csharp %}
  // C# syntax
  string repeatString(int a, String b)
{% endhighlight %}

or in the new type signature syntax we've been using:

{% highlight Elm %}
  repeatString : Int -> String -> String
{% endhighlight %}

An Int and a String go in, and a String comes back out. So this should typecheck and compile.

{% highlight csharp %}
  string result = repeatString(5, "Hi!");
  string[] parts = result.split('!');
  string answer = parts[0];
  Console.WriteLine(answer);
{% endhighlight %}

Ok, everything looks good, we would expect to see `Hi` as the output to the console. If we try to put in something nonsensical the compiler will stop us:

{% highlight csharp %}
  string result = repeatString(5, false); // type mismatch, expecting string got boolean
  string[] parts = result.split('!');
  string answer = parts[0];
  Console.WriteLine(answer);
{% endhighlight %}

Huzzah, the compiler has saved us from ourselves! I love it when my tools catch my mistakes. This is why people use a static type system right? While I am partial to static type systems, I'm afraid the typical ones you're likely to encounter in languages like Java and C# have a few holes compared with the type systems of a F#, Haskell, Elm, PureScript, Reason, or OCaml.

### Not Too Stronk

To start off, let's just look at the first line. Will the compiler complain about this?

{% highlight csharp %}
  string result = repeatString(5, null);
{% endhighlight %}

Maybe it's just me, but I'm pretty sure `repeatString` is not going to work properly. But the compiler still says this is ok when we're pretty certain it is not. Let's look at another potential issue:

{% highlight csharp %}
  string result = repeatString(5, "Hi");
{% endhighlight %}

The compiler says this is A-OK, thumbs up, 100% good-to-go, no problems here. We're definitely giving `repeatString` a value this time. When that function is done, we will have our string. Well, maybe ... unless the return value is null ... or the function throws an exception. Even on this single line we can't be sure of what we have. So what are we to do?

{% highlight csharp %}
  try {
    string result = repeatString(5, "Hi");
    if (result != null) {
      string[] parts = result.split('!');
      string answer = parts[0];
      Console.WriteLine(answer);
    }
  }
  catch(ex) {
    // um, do we have any idea why repeatString blew up, what exception to catch?
  }
{% endhighlight %}

This seems like an awful lot of work, and I agree, which is why no one does this.

>Well, no one does this until the code explodes in production and you get a bug report and you track it down to this line and realize the function throws under a "oh that will never happen" situation and you add a try/catch around it and BOOM, problem solved, what's the big deal?

Although a lot of extra code, the above version is a lot more honest about the possibilities of what might happen. I'm sure everyone here has encountered a runtime exception where some variable that wasn't supposed to be a certain value was, and as a result the app crashed... if you're lucky. If you're unlucky the app doesn't crash but is subtly wrong and it takes an additional 4 hrs - 2 weeks to hunt down all to change 1 line of code and "fix" the problem.

This situation frankly is pretty bizzare to me. Why are we allowing our tools that are supposed to make our lives easier, to lie to us? Furthermore, it's actively encouraged in many languages to write code in a style that leads to these kinds of situations. Maybe you're like me and it never really crossed your mind that null, or exceptions bore any responsibility for the kinds of bugs I'm describing here, but believe me, they definitely are.

We can't change C# or Java or any other language for that matter, but what we can do is ask

>What do I give up if I banish null and exceptions from all of my programs to the maximum extent possible?

Consider the code we started with:

{% highlight csharp %}
  string result = repeatString(5, "Hi");
  string[] parts = result.split('!');
  string answer = parts[0];
  Console.WriteLine(answer);
{% endhighlight %}

Under those circumstances, now what can we say about what this code does? We can't guarantee that `repeatString` builds up a string exactly as we expect, but we **can** be sure that `result` is not null, and that we can split the string safely. We're sure that split returns an array, but we can't be sure that it has any elements. This is good progress, we're much further along with much more certainty than we had before, but now we have another problem. You can't get the zero'eth element from an empty array, so there's now way that line could always succeed. This seems like a perfect use case for null?

This is definitely a perfect example of an operation that cannot succeed. Null is the go-to result for such situations, but null as well intentioned as it may be, causes a cascading set of issues as we discussed above. It's very important to be able to express the concept of "I don't have the values I need to do X", but null is 2x4 used as a club where we need a precision hammer.

### Leaving Null Behind

Since the List index operator is built-in to C# and not really anything we can work around, let's make up a new way to get to a value in a List:

{% highlight csharp %}
  SomeTypeThatCanRepresentSuccessOrFailure getValueAt(int index, List<string> list)
{% endhighlight %}

We'd need to figure out what is that `SomeTypeThatCanRepresentSuccessOrFailure` and while we're at it, this function could probably work on any List, not just List&lt;string&gt;. We can use generics to make it so:

{% highlight csharp %}
  SomeTypeThatCanRepresentSuccessOrFailure getValueAt<T>(int index, List<T> list)  
{% endhighlight %}

Now what do we want out of this type? It needs to encapsulate the roles of both the null, meaning this function was unsuccessful, and the value that would be returned if the function was successful. It must also make sure that it represents only one of these cases at a time. You can succeed sometimes and you can fail others, but you can't both succeed and fail at the same time.

{% highlight csharp %}
  struct SuccessOrFailure<T> {
    bool succeeded;
    T value;

    SuccessOrFailure(bool succeeded, T value) {
      this.succeeded = succeeded;
      this.value = value;
    }

    public static SuccessOrFailure<T> Succeed(T value) {
      return new SuccessOrFailure<T>(true, value);
    }

    public static SuccessOrFailure<T> Fail() {
      return new SuccessOrFailure<T>(false, default(T));
    }

    public T ValueOrDefault(T defaultValue) {
      return succeeded
        ? value
        : defaultValue;
    }
  }

  var value = SuccessOrFailure<int>.Succeed(5);
  Console.WriteLine(value.ValueOrDefault(-1)); // 5

  var value = SuccessOrFailure<int>.Fail();
  Console.WriteLine(value.ValueOrDefault(-1)); // -1
{% endhighlight %}

There's a lot of code here so let's examine what implications this has:

- This is a struct. In C# structs are value types, meaning they will never be null. Java does not have this option unfortunately.
- The constructor is private, so the only way to get a new value is to go through the `Succeed` or `Fail` functions which set the internal variables to the correct state.
- There is no way to directly get at the value, that would break the idea that this type might have a value and might not. The only way to extract a value out is through the `ValueOrDefault` which takes a default to use in the case that this object was constructed via a `Fail`.

SuccessOrFailure, while descriptive is perhaps a bit verbose. Two common names for this pattern are `Maybe` and `Option`. Elm, Haskell and PureScript use `Maybe`. F# and OCaml use `Option`. The functions that create the two values are also often named differently, being `Just` and `Nothing` in the `Maybe` case and `Some` and `None` in the `Option` case. Even though F# is closer to C#, since we're using Elm later, let's go with that naming. We also have some wiggle room on if `Nothing` should be a static function or a static readonly property.

{% highlight csharp %}
  struct Maybe<T> {
    bool succeeded;
    T value;

    Maybe(bool succeeded, T value) {
      this.succeeded = succeeded;
      this.value = value;
    }

    public static Maybe<T> Just(T value) {
      return new Maybe<T>(true, value);
    }

    public static readonly Maybe<T> Nothing = new Maybe<T>(false, default(T));

    public T FromMaybe(T defaultValue) {
      return succeeded
        ? value
        : defaultValue;
    }
  }
{% endhighlight %}

We can now make our `getValueAt` function

{% highlight csharp %}
  Maybe<string> getValueAt(int index, List<string> list)  
{% endhighlight %}

and use it in our program:

{% highlight csharp %}
  string result = repeatString(5, "Hi");
  string[] parts = result.split('!');
  string answer = getValueAt(0, parts).fromMaybe("");
  Console.WriteLine(answer);
{% endhighlight %}

Huzzah? I'm feeling a bit nervous about celebrating prematurely after the last time. Let's see if we've covered all our bases here:

- `repeatString` definitely returns a string
- `split` is safe because we definitely have a string
- `getValueAt` might succeed or fail but we account for that by providing a default of `""`

Huzzah! This really actually does work and apart from way-outside-our-control situations like an out of memory exception, it is **impossible for this to crash at runtime**. When was the last time you looked at 4+ lines of code and could say that? By elevating failure into its own type, we can both be much safer, as well as being easier to understand. No need to consult the docs, if there's a Maybe in the return type then you know there is _some_ condition under which it fails. This is sort of what checked exceptions were trying to accomplish in Java, except it's under out control and just relies on the same tools we use every day instead of forcing you into horrible try/catch blocks everywhere.

This is looking pretty good, apart from not being able to fully banish null, but with convention we can effectively lock it out in all the code that's under our control. When you do this, non FP C# code starts to feel like something you should be accessing through an FFI.

You also might remark that this is a semi-sizable amount of code to work around null. In C#, yes that is true, although the overall value proposition is still quite large. In Elm, the entirety of what we wrote would be the following:

{% highlight elm %}
  type Maybe a = Nothing | Just a

  withDefault : a -> Maybe a -> a
  withDefault default value =
    case value of
      Nothing -> default
      (Just a) -> a

  value = Just 5
  Debug.Log (withDefault -1)

  value = Nothing
  Debug.Log (withDefault -1)
{% endhighlight %}

### Maybe I Don't Want To Use Maybe

There is one other common situation we haven't covered, really a minor variation, but important to point out. What do we do for exceptions!?!

Maybe is insufficient for exceptions, because an exception carries with it information and the `Nothing` case of a Maybe communicates only a single bit of data (that the value is indeed the Nothing case). What we need is something like a Maybe that can carry data in either case.

{% highlight csharp %}
  struct Either<T, T2> {
    bool isRight;
    T leftValue;
    T2 rightValue;

    Either(bool isRight, T leftValue, T2 rightValue) {
      this.isRight = isRight;
      this.leftValue = leftValue;
      this.rightValue = rightValue;
    }

    public static Either<T, T2> Left(T value) {
      return new Either<T, T2>(false, value, default(T2));
    }

    public static Either<T, T2> Right(T2 value) {
      return new Either<T, T2>(true, default(T), value);
    }

    public bool IsRight() { return isRight; }

    public Result Case<Result>(Func<T, Result> ifLeft, Func<T2, Result> ifRight) {
      return isRight
        ? ifRight(rightValue)
        : ifLeft(leftValue);
    }
  }

  var result = ThingThatMightFail(99, "Good night and good luck");
  var final = result.Case((failure) => failure.message), (success) => success);
{% endhighlight %}

This is similar to above except now we have a function that might extract the left value and might extract the right value depending on which one the `Either` is representing. As with before, there are different names for this. Elm calls this `Result` and uses `Ok` and `Err` for the two cases. As you might expect, the Elm version is also quite a bit more compact.

{% highlight elm %}
  type Result a b = Err a | Ok b

  result = thingThatMightFail 99 "Good night and good luck"
  final = case result of
    (Ok value) -> value
    (Err value) -> value.message
{% endhighlight %}

With this, we could turn any function that cannot succeed and wants to return information about why into an Either/Result. This does not have the exact same effect in terms of jumping up a call stack, but it does allow you to accomplish that same end result, but now it's your decision and made explicit.

## [Next](/5-ramda/end-of-day-project)
