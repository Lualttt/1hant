# 1hant
1hant (one hand) is an [artsey.io](https://artsey.io) + [graphite](https://github.com/rdavison/graphite-layout) inspired one handed keyboard layout

the name 1hant comes from obviously one + hand with the mispelling on purpose since you need a chord for the letter d and not for the letter t :P

it is meant as an easy to use layout trying to minimalize effort pressing on the keys hence most keys are a chord with 2 keys

the bottom row is the home row

### Todo:
- [x] make backspace, enter, space and layer switches global chords
- [x] typing test like [monkey type](https://monkeytype.com)
- [ ] add wpm stat to the typing test
- [ ] keybinding menu
- [x] right hand support
- [x] punctuation & numbers
- [x] add remaining special characters
- [x] add modifier layout [#5](https://github.com/LualtOfficial/1hant/issues/5)
- [x] holding down a chord doesnt repeat the chord
- [ ] make it pretty ✨

### Layout:
```
this only shows the left handed layout to use this
with the right hand flip everything horizontally

--- Global Chords ---
Space | Enter | Backspace
....  | ....  | ....
....@ | ...#@ | .#..@

Text  | Punct | Number | Special | Modifier
...#  | ..#.  | .#..   | #...    | #..#
....@ | ....@ | ....@  | ....@   | ....@

Closed Encapsulating Key & Last Layered Key, you are able to switch these
chords around with a setting
CEK   | LLK
....  | ....
#...@ | ##..@

--- Text Layer ---
nrts
ieah_  (_ = space)

.... g | y ....
..##_  |  ##..._

##.. o | u ..##
...._  |   ...._

.##. d | l ....
...._  |   .##._

.... c | k #..#
#..#_  |   ...._

..#. m | v .##.
...#_  |   ...#_

.... w | f ....
.#.#_  |   #.#._

.#.# p | b #.#.
...._  |   ...._

.... j | q .###
.###_  |   ...._

.... x | z ###.
###._  |   ...._

--- Punctuation Layer ---
;:'"
!?,._

--- Number ---
5678
1234_

.... 0 | 9 ....
##..       ..##

--- Special Layer ---
/*-+
_()&s (s = space)

..##  = | @ ##..
...._   |   ...._

....  # | % ....
##.._   |   ..##_

....  $ | ~ .##.
.##._   |   ...._

..#. `  | ^ .##.
...#_   |   ...#_

....  { | } ....
#.#._   |   .#.#_

#.#.  [ | ] .#.#
...._   |   ...._

...#  < | > #...
#..._   |   ...#_

....  | | \ #..#
#..#_   |   ...._

--- Modifier Layour
HalfCaps will only have capslock until you press a space
FullCaps will act like a normal capslock

Alt Ctrl HCaps Shift
<-    ^    v    ->

##..  Esc | FCaps ..##
...._     |       ...._

#..#  Tab | Super .##.
...._     |       ...._

super =  gui, win, meta
```
