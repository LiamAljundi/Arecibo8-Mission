# Arecibo 9 Mission

A sci-fi interactive fiction game about exploring planets and decoding alien radio
messages. I made it for a game-design essay at Malmö University (2020) that asks
**how to overcome the lack of choices in interactive fiction games**.

- **Play it:** [liamaljundi.github.io/Arecibo9-Mission](https://liamaljundi.github.io/Arecibo9-Mission/start.html)
- **Read the essay:** [ESSAY.md](ESSAY.md)
- **More of my work:** [liamaljundi.com](https://www.liamaljundi.com)

## The game

A one-player space-discovery game that combines a branching story with illustrations,
music and a puzzle. As you approach each planet, your ship picks up a radio signal; the
**decoder** turns the alien message, played as audio cues, into visual symbols that you
have to match on a grid. Your choices along the way mark you as an adventurer, an
achiever or a loner, and lead you down different paths towards different endings.

## What it explored

The game was tested with players at every stage of development, and the results shaped
the essay's argument:

- **Puzzles turn a story into a game.** Testers saw the first version as a sci-fi story;
  adding the decoder made it a game.
- **A puzzle has to belong to the world.** Decoding alien signals fits a space-exploration
  story, and it sits at the natural break between acts (arriving at a new planet), never
  in the middle of a conversation.
- **Difficulty comes from testing.** The decoder was tested on its own with players of
  different musical and gaming backgrounds, through interviews and observed play
  sessions, which set its difficulty levels and its tutorial.
- **The illusion of choice works, if it stays invisible.** Branching paths alone still
  felt like a story; adding choices that lead to the same place made players feel in
  control of the plot.
- **The genre helps.** Quiet planets give many choices a shared destination, and
  ship-status, planet-statistics and system-check animations make actions feel like
  they matter.

## How it's built

| Part | Made with | Files |
|---|---|---|
| Story | Twine 2 (Harlowe), one exported page per act | `start.html`, `startToGreen.html` … `blueToReturn.html`, `return.html`, `lonelyPlanet.html` and the planet pages |
| Decoder puzzle and tutorial | p5.js and p5.sound | `decoder.html`, `sketch.js`, `tutorial.html`, `tutorial.js` |
| Music and alien messages | — | `audio/` |
| Look | Nasalization and Orbitron type, a rocket cursor | `fonts/`, `img/`, `style.css` |

## Run it locally

The decoder loads sound files, which browsers only allow from a web server. From this
folder:

```bash
python3 -m http.server 8000
```

then open http://localhost:8000/start.html.
