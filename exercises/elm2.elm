-- Copy paste this into Try Elm (http://elm-lang.org/try) and fill in the missing parts

import Html exposing (text)

abs : Int -> Int
abs n = ?

keepLargerThan : Int -> List Int -> List Int
keepLargerThan threshold numbers = ?

main =
  [12, 8, 32, 16, 22]
    |> List.map abs
    |> keepLargerThan 21
    |> List.foldl (+) 0
    |> toString
    |> text
