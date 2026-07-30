import OpenAI from "openai";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { PromptPackageSchema } from "../schemas.js";

const client = new OpenAI();

export async function renderImages(projectDir: string): Promise<void> {
  const promptFile = path.join(projectDir, "output", "05-prompts.json");
  const pkg = PromptPackageSchema.parse(
    JSON.parse(await readFile(promptFile, "utf8")),
  );

  const outDir = path.join(projectDir, "assets", "generated");
  await mkdir(outDir, { recursive: true });

  const model = process.env.BM_IMAGE_MODEL ?? "gpt-image-2";

  for (const scene of pkg.scenes) {
    console.log(`Rendering ${scene.id}...`);

    const result = await client.images.generate({
      model,
      prompt: [
        pkg.masterStylePrompt,
        scene.imagePrompt,
        `Continuity references: ${scene.referenceKeys.join(", ")}`,
        `Avoid: ${[
          ...pkg.globalNegativeConstraints,
          ...scene.negativeConstraints,
        ].join("; ")}`,
      ].join("\n\n"),
      size: "1536x1024",
    });

    const b64 = result.data?.[0]?.b64_json;
    if (!b64) {
      throw new Error(`No image payload returned for ${scene.id}`);
    }

    await writeFile(
      path.join(outDir, `${scene.id}.png`),
      Buffer.from(b64, "base64"),
    );
  }

  console.log(`✓ Images written to ${outDir}`);
}
