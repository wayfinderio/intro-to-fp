---
title: Introducing Elm
category: Elm
order: 1
---

Elm, like any production ready programming language is a large topic and we couldn't possibly cover everything about the language in a single week much less a single day. We will cover the major topics in Elm and work through implementing a TodoMVC style application as an introduction.

### Elm command line tools

Elm package is the equivalent of NPM. It is responsible for downloading packages and their dependencies. One unique feature of Elm package is that it **enforces** `semver`.

[Elm package](https://guide.elm-lang.org/install.html#elm-package)

Elm reactor is a development tool that watches your project and recompiles as you make changes.

[Elm reactor](https://guide.elm-lang.org/install.html#elm-reactor)

When you are ready to create a final output file that can be deployed to a web server `Elm make` will build this for you.

[Elm make](https://guide.elm-lang.org/install.html#elm-make)

### Try Elm

Elm has a very nice [online REPL](http://elm-lang.org/try) (Read Eval Print Loop) that makes it easy to try out Elm syntax and test out code snippets.

### Elm syntax

For a language reference [see here](https://guide.elm-lang.org/core_language.html)

For an API reference [see here](http://package.elm-lang.org/packages/elm-lang/core)

Some core concepts to be familiar with:

- Types
- Aliases
- Variables
- Functions
- If expression
- Data structures
  - List
  - Tuple
  - Record
- Pipe forward/backwards
- Destructuring ([cheatsheet](https://gist.github.com/yang-wei/4f563fbf81ff843e8b1e))
- Pattern matching
- Commands / Subscriptions
- Messages
- Ports

### Elm Architecture

[Elm Architecture](https://guide.elm-lang.org/architecture/)

Let's try out several of the examples on Try Elm

### Elm TodoMVC

Ok it's time to start working on our own implementation of [TodoMVC](http://todomvc.com/).

[Final implementation by Evan Czaplicki](https://github.com/evancz/elm-todomvc)
