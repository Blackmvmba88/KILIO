import { z } from "zod";

export const SongInputSchema = z.object({
  title: z.string().min(1),
  artist: z.string().default("Iyari Gomez"),
  label: z.string().default("BlackMamba RECORDS"),
  durationMs: z.number().int().positive().optional(),
  language: z.string().default("es"),
  lyrics: z.string().min(1),
});

export const SongAnalysisSchema = z.object({
  oneSentenceCore: z.string(),
  surfaceStory: z.string(),
  speaker: z.string(),
  addressee: z.string(),
  emotionalArc: z.array(z.object({
    phase: z.string(),
    emotion: z.string(),
    intensity: z.number().min(0).max(1),
    evidence: z.string(),
  })).min(3),
  motifs: z.array(z.object({
    motif: z.string(),
    meaning: z.string(),
    recurrence: z.string(),
  })).min(3),
  tensions: z.array(z.string()).min(2),
  sensoryVocabulary: z.array(z.string()).min(5),
  visualPotential: z.array(z.string()).min(5),
});

export const PhilosophySchema = z.object({
  thesis: z.string(),
  antithesis: z.string(),
  centralParadox: z.string(),
  existentialQuestion: z.string(),
  hiddenNeed: z.string(),
  wound: z.string(),
  desire: z.string(),
  fear: z.string(),
  transformation: z.string(),
  uncomfortableTruth: z.string(),
  philosophicalLenses: z.array(z.object({
    lens: z.string(),
    reading: z.string(),
  })).min(3),
  symbols: z.array(z.object({
    symbol: z.string(),
    literalMeaning: z.string(),
    deeperMeaning: z.string(),
    visualUse: z.string(),
  })).min(5),
  forbiddenCliches: z.array(z.string()).min(3),
});

export const NarrativeConceptSchema = z.object({
  id: z.string(),
  title: z.string(),
  logline: z.string(),
  mode: z.enum(["grounded", "metaphorical", "surreal"]),
  protagonist: z.string(),
  world: z.string(),
  dramaticQuestion: z.string(),
  beginning: z.string(),
  midpoint: z.string(),
  climax: z.string(),
  ending: z.string(),
  recurringSymbols: z.array(z.string()).min(3),
  visualHook: z.string(),
  score: z.number().min(0).max(100),
});

export const ConceptsSchema = z.object({
  concepts: z.array(NarrativeConceptSchema).length(3),
  recommendedId: z.string(),
  recommendationReason: z.string(),
});

export const SceneSchema = z.object({
  id: z.string(),
  startMs: z.number().int().nonnegative(),
  endMs: z.number().int().positive(),
  section: z.string(),
  dramaticBeat: z.string(),
  emotionalFunction: z.string(),
  action: z.string(),
  environment: z.string(),
  characterState: z.string(),
  symbols: z.array(z.string()),
  camera: z.object({
    shot: z.string(),
    lens: z.string(),
    movement: z.string(),
    composition: z.string(),
  }),
  lighting: z.string(),
  transitionIn: z.string(),
  transitionOut: z.string(),
  continuityAnchors: z.array(z.string()).min(2),
});

export const DirectionSchema = z.object({
  chosenConceptId: z.string(),
  cinematicStatement: z.string(),
  visualBible: z.object({
    visualIdentity: z.string(),
    palette: z.array(z.string()).min(4),
    lightingGrammar: z.array(z.string()).min(3),
    textureGrammar: z.array(z.string()).min(3),
    cameraGrammar: z.array(z.string()).min(3),
    protagonistContinuity: z.array(z.string()).min(4),
    worldContinuity: z.array(z.string()).min(4),
    recurringSymbols: z.array(z.string()).min(3),
    neverChange: z.array(z.string()).min(3),
    avoid: z.array(z.string()).min(3),
  }),
  scenes: z.array(SceneSchema).min(6),
});

export const CompiledSceneSchema = SceneSchema.extend({
  imagePrompt: z.string(),
  motionPrompt: z.string(),
  negativeConstraints: z.array(z.string()),
  referenceKeys: z.array(z.string()).min(2),
});

export const PromptPackageSchema = z.object({
  masterStylePrompt: z.string(),
  globalNegativeConstraints: z.array(z.string()),
  scenes: z.array(CompiledSceneSchema).min(6),
});

export type SongInput = z.infer<typeof SongInputSchema>;
export type SongAnalysis = z.infer<typeof SongAnalysisSchema>;
export type Philosophy = z.infer<typeof PhilosophySchema>;
export type Concepts = z.infer<typeof ConceptsSchema>;
export type Direction = z.infer<typeof DirectionSchema>;
export type PromptPackage = z.infer<typeof PromptPackageSchema>;
