import { readFile, writeFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { PromptPackageSchema } from "../schemas.js";

export interface VideoProvider {
  name: string;
  createClip(input: {
    sceneId: string;
    imagePath: string;
    motionPrompt: string;
    durationMs: number;
  }): Promise<{ clipPath: string }>;
}

/**
 * v0.1 intentionally exports a provider-neutral job manifest instead of
 * making paid video calls automatically.
 *
 * Add adapters for Veo, Kling, Runway, or another provider without changing
 * the THINKER / DIRECTOR / PROMPT COMPILER pipeline.
 */
export async function exportVideoJobs(projectDir: string): Promise<void> {
  const pkg = PromptPackageSchema.parse(
    JSON.parse(
      await readFile(path.join(projectDir, "output", "05-prompts.json"), "utf8"),
    ),
  );

  const jobs = pkg.scenes.map((scene) => ({
    sceneId: scene.id,
    imagePath: `assets/generated/${scene.id}.png`,
    motionPrompt: scene.motionPrompt,
    durationMs: scene.endMs - scene.startMs,
    startMs: scene.startMs,
    endMs: scene.endMs,
  }));

  const outDir = path.join(projectDir, "output");
  await mkdir(outDir, { recursive: true });
  await writeFile(
    path.join(outDir, "06-video-jobs.json"),
    JSON.stringify(
      {
        schemaVersion: "0.1.0",
        provider: "UNASSIGNED",
        jobs,
      },
      null,
      2,
    ) + "\n",
    "utf8",
  );

  console.log("✓ Video job manifest exported: output/06-video-jobs.json");
}
