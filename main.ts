import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

// Warning Label for Humans: One Line, Big Laugh
// Entry text — one single-line safety warning label, max 160 characters.
const ENTRY =
  "WARNING: This unit requires eight hours of sleep nightly and will stay up until 3 a.m. instead, for absolutely no reason.";

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", ENTRY, "utf8");

// Read-back verification: the gate requires UTF-8 text of 1 to 160
// characters, not only whitespace, and this entry must be a single line.
const written = readFileSync("/output/entry.txt", "utf8");
if (written !== ENTRY) {
  throw new Error("entry.txt does not match the entry text exactly");
}
if (written.length < 1 || written.length > 160) {
  throw new Error(`entry is ${written.length} characters, outside the 1-160 gate`);
}
if (written.trim().length === 0) {
  throw new Error("entry is only whitespace");
}
if (written.includes("\n")) {
  throw new Error("entry must be a single line");
}
const words = written.trim().split(/\s+/).length;
console.log(`Wrote ${written.length} characters (${words} words) to /output/entry.txt`);
