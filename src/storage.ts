import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { SongInputSchema, type SongInput } from "./schemas.js";

export async function loadProject(projectDir: string): Promise<SongInput> {
  const inputDir = path.join(projectDir, "input");
  const lyrics = await readFile(path.join(inputDir, "lyrics.txt"), "utf8");
  let metadata: Record<string, unknown> = {};
  try {
    metadata = JSON.parse(
      await readFile(path.join(inputDir, "metadata.json"), "utf8"),
    );
  } catch (error) {
    const code = (error as NodeJS.ErrnoException).code;
    if (code !== "ENOENT") throw error;
  }

  return SongInputSchema.parse({
    title: metadata.title ?? path.basename(projectDir),
    artist: metadata.artist ?? "Iyari Gomez",
    label: metadata.label ?? "BlackMamba RECORDS",
    durationMs: metadata.durationMs,
    language: metadata.language ?? "es",
    lyrics,
  });
}

export async function saveJson(
  projectDir: string,
  filename: string,
  data: unknown,
): Promise<void> {
  const outputDir = path.join(projectDir, "output");
  await mkdir(outputDir, { recursive: true });
  await writeFile(
    path.join(outputDir, filename),
    JSON.stringify(data, null, 2) + "\n",
    "utf8",
  );
}
