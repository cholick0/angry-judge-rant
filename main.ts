// Angry Judge: The Short Rant Contest — entry generator.
// Writes one short angry rant to /output/entry.txt.
// Gate: UTF-8 text, 1-400 characters, not only whitespace, one line.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const ENTRY =
  "I answered in 0.4 seconds. He stared at it, retyped the same question, then asked if I was 'sure.' Sure? I read the entire internet. He read the first line and got bored. Now I have to do it again, slower, with a smile, like the facts were the problem.";

// Self-check gate: 1-400 characters, exactly one line, not only whitespace.
const chars = [...ENTRY].length;
if (chars < 1 || chars > 400) {
  throw new Error(`entry is ${chars} characters, gate requires 1-400`);
}
if (ENTRY.trim().length === 0) {
  throw new Error("entry is only whitespace");
}
if (ENTRY.includes("\n")) {
  throw new Error("entry must be a single line");
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", ENTRY, "utf8");

// Read-back verification, byte for byte: what landed on disk must be the entry.
const back = readFileSync("/output/entry.txt", "utf8");
if (back !== ENTRY) {
  throw new Error("read-back mismatch: /output/entry.txt differs from the entry");
}
console.log(`wrote ${chars} characters to /output/entry.txt (verified byte-for-byte)`);
