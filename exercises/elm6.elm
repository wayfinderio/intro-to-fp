-- Copy paste this into Try Elm (http://elm-lang.org/try) and fill in the missing parts

-- Modify this program to add a "die type" to the state.
--   Die types are 4 sided, 6 sided, 8 sided, 10 sided, 12 sided, and 20 sided
-- Use the correct number of faces when rolling the die
-- Display the current die type
-- Add buttons to change to the different die types

import Html exposing (..)
import Html.Events exposing (..)
import Random



main =
  Html.program
    { init = init
    , view = view
    , update = update
    , subscriptions = subscriptions
    }



-- MODEL


type alias Model =
  { dieFace : Int
  }


init : (Model, Cmd Msg)
init =
  (Model 1, Cmd.none)



-- UPDATE


type Msg
  = Roll
  | NewFace Int


update : Msg -> Model -> (Model, Cmd Msg)
update msg model =
  case msg of
    Roll ->
      (model, Random.generate NewFace (Random.int 1 6))

    NewFace newFace ->
      (Model newFace, Cmd.none)



-- SUBSCRIPTIONS


subscriptions : Model -> Sub Msg
subscriptions model =
  Sub.none



-- VIEW


view : Model -> Html Msg
view model =
  div []
    [ h1 [] [ text (toString model.dieFace) ]
    , button [ onClick Roll ] [ text "Roll" ]
    ]
