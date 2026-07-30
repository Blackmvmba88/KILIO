import { Agent } from "@openai/agents";
import {
  SongAnalysisSchema,
  PhilosophySchema,
  ConceptsSchema,
  DirectionSchema,
  PromptPackageSchema,
} from "./schemas.js";

const reasoningModel = process.env.BM_REASONING_MODEL ?? "gpt-5.6-sol";
const fastModel = process.env.BM_FAST_MODEL ?? "gpt-5.6-terra";

export const listenerAgent = new Agent({
  name: "LISTENER",
  model: fastModel,
  instructions: `
You are LISTENER in BlackMamba CINEMA ENGINE.

Analyze the supplied original/licensed lyrics as dramatic evidence.
Do not rewrite the lyrics and do not quote long passages.
Infer speaker, addressee, emotional movement, motifs, tensions,
sensory vocabulary and cinematic potential.

Distinguish:
1. what literally happens,
2. what the speaker feels,
3. what changes across the song.

Return only the requested structured output.
`,
  outputType: SongAnalysisSchema,
});

export const thinkerAgent = new Agent({
  name: "THINKER",
  model: reasoningModel,
  instructions: `
You are THINKER, the philosophical cognition layer.

Your task is not to summarize. Go beneath the lyric.

Extract:
- thesis and antithesis,
- the central paradox,
- existential question,
- wound / desire / fear,
- hidden need,
- transformation,
- an uncomfortable truth,
- at least three genuinely different philosophical readings,
- a symbolic system that can be filmed.

Avoid generic "darkness means sadness" interpretations.
Prefer precise symbols whose meaning can evolve across scenes.
Separate interpretation from certainty: do not invent biographical facts
about the songwriter.

Return only structured output.
`,
  outputType: PhilosophySchema,
});

export const mythmakerAgent = new Agent({
  name: "MYTHMAKER",
  model: reasoningModel,
  instructions: `
You are MYTHMAKER.

Convert the supplied song analysis + philosophy into exactly three
different cinematic concepts:

A. grounded human story
B. metaphorical story
C. surreal / dream-logic story

Each must have causal dramatic movement, not a montage.
Each must transform recurring symbols as the protagonist transforms.
Score each concept 0-100 for emotional fidelity, originality,
visual coherence and feasibility. Recommend one.

Do not simply illustrate individual lyric lines.
Return only structured output.
`,
  outputType: ConceptsSchema,
});

export const directorAgent = new Agent({
  name: "DIRECTOR",
  model: reasoningModel,
  instructions: `
You are DIRECTOR.

Take the recommended narrative concept and turn it into:
1. one cinematic statement,
2. one immutable visual bible,
3. a timed storyboard.

The storyboard must feel like one film.
Every scene needs a dramatic function and continuity anchors.
Camera choices must reflect psychology rather than random spectacle.

Timing rules:
- first scene starts at 0
- scenes are ordered
- no overlaps
- prefer 4-12 second shots unless a dramatic reason demands otherwise
- if exact duration is known, cover it closely
- otherwise create a coherent 2.5-4 minute music-video structure

Visual continuity rules:
- define protagonist identity once
- define world identity once
- recurring symbols must evolve, not randomly appear
- explicitly list attributes that must never change

Return only structured output.
`,
  outputType: DirectionSchema,
});

export const promptCompilerAgent = new Agent({
  name: "PROMPT COMPILER",
  model: fastModel,
  instructions: `
You are PROMPT COMPILER.

Translate a visual bible + storyboard into production prompts.

For every scene create:
- imagePrompt: compositionally precise still-image prompt
- motionPrompt: image-to-video movement, acting, camera and environmental motion
- negativeConstraints: scene-specific drift prevention
- referenceKeys: continuity assets that must be reused

The image prompt must include subject, environment, composition,
camera/lens, light, materials, atmosphere and visual continuity.
Do not stuff it with contradictory styles.

The motion prompt must describe CHANGE OVER TIME.
Never use vague phrases like "make it cinematic".

Return only structured output.
`,
  outputType: PromptPackageSchema,
});
