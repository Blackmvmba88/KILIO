import { run } from "@openai/agents";
import {
  listenerAgent,
  thinkerAgent,
  mythmakerAgent,
  directorAgent,
  promptCompilerAgent,
} from "./agents.js";
import { loadProject, saveJson } from "./storage.js";

function requireOutput<T>(value: T | undefined, stage: string): T {
  if (value === undefined) {
    throw new Error(`${stage} returned no final output`);
  }
  return value;
}

export async function analyzeProject(projectDir: string): Promise<void> {
  const song = await loadProject(projectDir);

  console.log(`\nBLACKMAMBA CINEMA ENGINE`);
  console.log(`Song: ${song.title} — ${song.artist}\n`);

  console.log("01 LISTENER → song anatomy");
  const analysisRun = await run(
    listenerAgent,
    JSON.stringify(song),
  );
  const analysis = requireOutput(analysisRun.finalOutput, "LISTENER");
  await saveJson(projectDir, "01-analysis.json", analysis);

  console.log("02 THINKER → philosophical depth");
  const philosophyRun = await run(
    thinkerAgent,
    JSON.stringify({ song, analysis }),
  );
  const philosophy = requireOutput(philosophyRun.finalOutput, "THINKER");
  await saveJson(projectDir, "02-philosophy.json", philosophy);

  console.log("03 MYTHMAKER → 3 narrative universes");
  const conceptsRun = await run(
    mythmakerAgent,
    JSON.stringify({ song, analysis, philosophy }),
  );
  const concepts = requireOutput(conceptsRun.finalOutput, "MYTHMAKER");
  await saveJson(projectDir, "03-concepts.json", concepts);

  console.log("04 DIRECTOR → visual bible + timed storyboard");
  const directionRun = await run(
    directorAgent,
    JSON.stringify({ song, analysis, philosophy, concepts }),
  );
  const direction = requireOutput(directionRun.finalOutput, "DIRECTOR");
  await saveJson(projectDir, "04-direction.json", direction);

  console.log("05 PROMPT COMPILER → image + motion prompts");
  const promptsRun = await run(
    promptCompilerAgent,
    JSON.stringify({ song, analysis, philosophy, direction }),
  );
  const prompts = requireOutput(promptsRun.finalOutput, "PROMPT COMPILER");
  await saveJson(projectDir, "05-prompts.json", prompts);

  const manifest = {
    schemaVersion: "0.1.0",
    project: {
      title: song.title,
      artist: song.artist,
      label: song.label,
    },
    state: "READY_FOR_RENDER",
    artifacts: {
      analysis: "output/01-analysis.json",
      philosophy: "output/02-philosophy.json",
      concepts: "output/03-concepts.json",
      direction: "output/04-direction.json",
      prompts: "output/05-prompts.json",
    },
    executionPolicy: {
      renderImagesAutomatically: false,
      renderVideoAutomatically: false,
      publishAutomatically: false,
    },
  };
  await saveJson(projectDir, "manifest.json", manifest);

  console.log("\n✓ READY_FOR_RENDER");
  console.log(`Inspect: ${projectDir}/output/05-prompts.json`);
  console.log("Image/video generation remains an explicit separate action.\n");
}
