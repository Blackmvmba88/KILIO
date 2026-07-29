# KILIO Roadmap

## v0.1 — Cognitive Cinema Core

Status: draft PR #1

Goal: transform lyrics into a coherent cinematic narrative with structured artifacts.

- LISTENER
- THINKER
- MYTHMAKER
- DIRECTOR
- PROMPT COMPILER
- Visual DNA
- image prompt renderer
- provider-neutral video jobs

Exit gate:

- TypeScript build green
- example project parses
- no automatic paid rendering

## v0.2 — Song Assimilation Engine

Goal: make the song itself authoritative, not only the lyrics.

### AUDIO LISTENER

Input:

- WAV / MP3
- lyrics
- optional metadata

Produces:

- duration
- BPM estimate
- downbeat
- beat grid
- sections
- energy curve
- onset/transient map
- silence/breath regions
- structural change points

### LYRIC ALIGNER

Produces word/line timing when available:

```json
{
  "line": "example lyric line",
  "startMs": 18420,
  "endMs": 22610,
  "confidence": 0.94
}
```

### MUSICAL DRAMA MAP

Combines semantic meaning with musical movement:

```text
lyrics meaning
      +
energy / rhythm / sections
      ↓
dramatic timeline
```

Each scene receives:

- musical section
- lyric span
- emotional state
- energy
- beat-aware start/end
- visual action
- transition strategy

## v0.3 — Continuity Engine

- canonical protagonist sheet
- wardrobe sheet
- location sheet
- object/symbol registry
- reference-image registry
- visual drift scoring
- contact sheet generation
- regeneration of failed scenes only

## v0.4 — Motion Engine

- image-to-video provider adapters
- camera motion compiler
- character motion constraints
- environmental motion
- scene handles
- transition clips

## v0.5 — Editor

- FFmpeg timeline assembly
- beat-aware cuts
- scene trim handles
- audio master remains authoritative
- subtitles / karaoke layer
- preview render
- final render manifest

## v1.0 — Song → Film

```text
AUDIO + LYRICS
      ↓
ASSIMILATION
      ↓
PHILOSOPHICAL MODEL
      ↓
DRAMATIC MODEL
      ↓
VISUAL DNA
      ↓
STORYBOARD
      ↓
IMAGES
      ↓
MOTION
      ↓
BEAT EDIT
      ↓
FINAL VIDEO
```

Invariant: the audio timeline is authoritative. Visual generation must never alter musical time.
