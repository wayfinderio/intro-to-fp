---
title: Introducing Elm
category: Elm
order: 1
---

Elm, like any production ready programming language is a large topic and we couldn't possibly cover everything about the language in a single week much less a single day. We will cover the major topics in Elm and work through implementing multiple hands on exercises.

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

Open up the [Hello World](http://elm-lang.org/examples/hello-html) example on Try Elm, and experiment with the following concepts.

Some core concepts to become familiar with:

- Variables
- Functions / Lambdas
- Pipe forward/backwards
- exercises/elm1.elm
- If expression
- Map / filter / fold
- Case of
- exercises/elm2.elm
- Types (Sum and Product types, aka ADT's)
- Aliases
- Data structures
  - List
  - Tuple
  - Record
- Maybe / Result
- exercises/elm3.elm
- Destructuring ([cheatsheet](https://gist.github.com/yang-wei/4f563fbf81ff843e8b1e))
- Pattern matching
- Elm Html
- exercises/elm4.elm

### Elm Architecture

[Elm Architecture](https://guide.elm-lang.org/architecture/)

- Messages
- exercises/elm5.elm

### Effects

There are several examples specific to both Commands and Subscriptions

- Commands: [Random](http://elm-lang.org/examples/random), [HTTP](http://elm-lang.org/examples/http)
- Subscriptions: [Time](http://elm-lang.org/examples/time), [Websockets](http://elm-lang.org/examples/websockets), [Mouse Drags](http://elm-lang.org/examples/drag)
- exercises/elm6.elm

### Larger project example

Based on the [TodoMVC](http://todomvc.com/) structure.

[Final implementation by Evan Czaplicki](https://github.com/evancz/elm-todomvc)
