-- Copy paste this into Try Elm (http://elm-lang.org/try) and fill in the missing parts

import Html exposing (text)

type Class = Fighter | Paladin | Ranger | Mage | Cleric | Druid | Thief | Bard
type Race = Dwarf | Elf | Gnome | HalfElf | Halfling | Human
type alias Item =
  { name : String
  , itemType : ItemType
  }
type ItemType = Weapon | Shield | Other

type alias Character =
  { name : String
  , class : Class
  , race : Race
  , mainItem : Maybe Item
  , offHandItem : Maybe Item
  }

lily =
  { name = "Lily"
  , class = Paladin
  , race = Human
  , mainItem = Just
      { name = "+1 Sword of smiting"
      , itemType = Weapon
      }
  , offHandItem = Nothing
  }

max =
  { name = "Max"
  , class = Mage
  , race = HalfElf
  , mainItem = Just
      { name = "Wizardly wand of wizardry"
      , itemType = Weapon
      }
  , offHandItem = Just
      { name = "Book of spells"
      , itemType = Other
      }
  }

showClass : Class -> String
showClass class = ?

showRace : Race -> String
showRace race = ?

showItem : Item -> String
showItem item = ?

-- Title formats the details of a character, for example for lily it would return
-- Lily is a Human Paladin who carries a weapon: +1 Sword of smiting and nothing else
title : Character -> String
title character = ?

main =
  title lily
    |> text
