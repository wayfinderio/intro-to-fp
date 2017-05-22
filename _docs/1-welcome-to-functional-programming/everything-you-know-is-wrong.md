---
title: Everything you know is wrong
category: Welcome to Functional Programming
order: 1
---

If you've been programming for a while, this is one of the few times in your career where you will hear that your experience will likely be a disadvantage. It's rather hyperbolic to say that **everything** you know is wrong, but it may _feel_ that way fairly soon. Functional programming comes from such a different origin that it may feel entirely foreign to you, even though the code we're writing is still JavaScript that runs in a browser or Node.

Many of the patterns you might have encountered in the world of OO or everyday JavaScript may well be anti-patterns, and some anti-patterns are now "best practices". Sometimes it may feel like the whole world is turned upside down and you are being trolled. Rest assured this is not a joke and perfectly normal. As with anything that has a strong sense of "the right way", there are often perfectly valid alternatives, even if those alternatives are not as common.

### What is "right"

As an example, let's look at writing. It's probably safe to assert that when writing, it is correct to start at the top-left and proceed to the right, wrapping to the next line when you get to the edge of your writing area. The sentences you are reading right now follow this form and as a result you can read them.

> .daer ot tluciffid erom hcum era noitcerid etisoppo eht ni og taht secnetneS

This sentence contains all the same letters and spacing but is almost impossible to read on first glance. But why is this? Why is left-to-right automatically the correct way to do things? If you grew up learning Arabic, reading left-to-right would be as hard as the above sentence is to an English speaker. It would feel totally unnatural.

> الجمل التي تذهب في الاتجاه المعاكس هي أكثر صعوبة في القراءة

Let's go a step farther. In both English and Arabic, spaces are the correct way to separate words so that a sentence can be parsed, regardless of which direction you are reading. But what about the following sentence?

> 相反方向的句子更难阅读

Where are the spaces? Is that one word or two (or three)? What kind of language would just not have spaces? Can a language that does away with something as fundamental as spaces really convey all the same meaning, subtleties, and diversity as a language that has spaces?

Furthermore, how much harder is it to learn a new language that does things like change the order of reading or foregoes spaces as a means of conveying semantic meaning? If you know English and you want to learn a new language, there is definitely a difference between learning a language that is closer to your current knowledge, such as Spanish, vs a language that is further away, such as Mandarin.

### Programming languages

Now consider the languages you currently know or have been exposed to. They're probably on the following list:

- C#
- C++
- Go
- Java
- JavaScript
- Objective-C
- Pascal
- Perl
- PHP
- Python
- Ruby
- Swift
- Visual Basic

All these languages, as different as they may seem are very close to each other in terms of "language family". Switching between them is like going from Spanish to Italian or maybe French to German if they're a bit less alike. Learning Arabic by contrast would be like learning:

- Clojure
- Elixir
- Erlang
- F#
- OCaml
- Racket / Lisp
- Rust
- Scala (with ScalaZ)

Here there is some familiarity of structure, but much is different. Learning something like Japanese with very different roots and rules for how the language is expressed is like learning:

- Agda
- Coq
- Elm
- F*
- Haskell
- Idris
- Isabelle
- PureScript

So yeah, we're going for the programming language equivalent of Japanese or Mandarin here, not a German or Polish.

### Beginner's mind

We will use JavaScript as a starting point, since it is common and hopefully familiar to you. This will be a different JavaScript than the one that you may be familiar with. Try to resist the natural tendency to feel that it is wrong because it is different. Take on the beginner's mind and imagine you are learning JavaScript again for the first time. If it helps, pretend you've been pulled into an alternate dimension where JavaScript developed differently and you're now trying to figure out how it works here, in the FP dimension.

## [Next](/1-welcome-to-functional-programming/javascript)
