-- Copy paste this into Try Elm (http://elm-lang.org/try) and fill in the missing parts

-- Modify this program to keep track of all increments and decrements as a List
--  The view still displays the current total of all the increments and decrements
-- Modify this program to include a reset button that clears the program history

import Html exposing (beginnerProgram, div, button, text)
import Html.Events exposing (onClick)


main =
  beginnerProgram { model = 0, view = view, update = update }


view model =
  div []
    [ text [] "Loading" ]


type Msg = PageLoaded String


update msg model =
  case msg of
    PageLoaded contents ->
      model
