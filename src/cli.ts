#!/usr/bin/env node
import { Command } from "commander";
import { analyzeProject } from "./pipeline.js";
import { renderImages } from "./providers/image.js";
import { exportVideoJobs } from "./providers/video.js";

const program = new Command();

program
  .name("blackmamba-cinema")
  .description("Song → philosophy → cinematic story → visual prompts")
  .version("0.1.0");

program
  .command("analyze")
  .argument("<projectDir>")
  .description("Run LISTENER → THINKER → MYTHMAKER → DIRECTOR → PROMPT COMPILER")
  .action(async (projectDir: string) => {
    await analyzeProject(projectDir);
  });

program
  .command("render-images")
  .argument("<projectDir>")
  .description("Explicitly generate scene master images with GPT Image 2")
  .action(async (projectDir: string) => {
    await renderImages(projectDir);
  });

program
  .command("export-video-jobs")
  .argument("<projectDir>")
  .description("Export provider-neutral image-to-video jobs")
  .action(async (projectDir: string) => {
    await exportVideoJobs(projectDir);
  });

program.parseAsync(process.argv).catch((error) => {
  console.error(error instanceof Error ? error.stack : error);
  process.exitCode = 1;
});
