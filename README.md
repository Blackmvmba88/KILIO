# BlackMamba CINEMA ENGINE

**Song → meaning → philosophy → mythology → storyboard → image prompts → motion prompts → render manifest**

BlackMamba CINEMA ENGINE is a CLI-first, structured-output pipeline for converting a song into a coherent cinematic world.

The core idea is deliberately **not** "lyrics → random images".

Instead:

```text
SONG / LYRICS
    ↓
LISTENER        musical + lyrical anatomy
    ↓
THINKER         philosophical deep interpretation
    ↓
MYTHMAKER       alternative narrative concepts
    ↓
DIRECTOR        selected story + visual bible + timed storyboard
    ↓
PROMPT COMPILER image prompts + motion prompts
    ↓
CONTINUITY QA   identity / palette / symbols / camera constraints
    ↓
READY_FOR_RENDER
    ↓
IMAGE PROVIDER  (GPT Image 2 adapter included)
    ↓
VIDEO PROVIDER  (provider interface; plug in Veo / Kling / Runway / other)
    ↓
EDITOR          beat/timeline assembly
```

## Why this architecture

A single large prompt tends to create beautiful but unrelated frames. This project persists a **Visual DNA** before generating assets:

- philosophical thesis
- central paradox
- emotional arc
- recurring symbols
- character identity
- wardrobe
- locations
- palette
- lighting grammar
- lens/camera grammar
- forbidden drift
- scene-to-scene continuity anchors

Every downstream scene must inherit that DNA.

## v0.1 behavior

`analyze` makes local JSON artifacts and calls OpenAI reasoning models.

`render-images` is deliberately separate because it creates paid external assets.

Video generation is behind a provider interface and is not auto-triggered.

No publishing, uploading, deleting, or distribution is implemented.

## Install

```bash
npm install
cp .env.example .env
# Put OPENAI_API_KEY in your local environment or .env loader of choice.
```

The OpenAI Agents SDK package is `@openai/agents` and uses Zod schemas for structured outputs.

## Project input

Create:

```text
projects/my-song/
└── input/
    ├── lyrics.txt
    └── metadata.json
```

Example `metadata.json`:

```json
{
  "title": "La Verdad",
  "artist": "Iyari Gomez",
  "label": "BlackMamba RECORDS",
  "durationMs": 214000,
  "language": "es"
}
```

## Run the cognitive pipeline

```bash
npm run cinema -- analyze projects/my-song
```

Outputs:

```text
projects/my-song/output/
├── 01-analysis.json
├── 02-philosophy.json
├── 03-concepts.json
├── 04-direction.json
├── 05-prompts.json
└── manifest.json
```

## Generate master images

This is a separate explicit step:

```bash
npm run cinema -- render-images projects/my-song
```

Generated images are written to:

```text
projects/my-song/assets/generated/
```

## Design principle

**The lyric is evidence, not the screenplay.**

THINKER asks what the song is *really* saying.
MYTHMAKER turns meaning into dramatic possibilities.
DIRECTOR turns one dramatic possibility into visual causality.
PROMPT COMPILER turns causality into renderable shots.

That is how the video remains a story instead of becoming a slideshow.

## Suggested next layers

- audio waveform / beat / section analysis
- forced lyric alignment
- image-reference continuity
- automated contact sheet
- image-to-video provider adapters
- FFmpeg beat editor
- semantic/visual evals
- reusable style memory from approved BlackMamba artwork
- Recall integration for canonical song IDs and asset registry
