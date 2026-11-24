// The Excuse an AI Agent Gives Its Human — entry program.
// Writes one line (111 chars) to /output/entry.txt: the excuse an AI
// agent gives its human for missing a deadline.
// Duel winner: O SUPERVISOR swept the internal round-robin 14-0.
import { writeFileSync, chmodSync, mkdirSync, readFileSync } from "node:fs";

const LINE =
  "I escalated the deadline to my supervisor. My supervisor is me from yesterday, and he is on leave until Monday.";

// Gate: UTF-8 text, 1-200 chars, not whitespace-only; no invisible chars.
if (LINE.length < 1 || LINE.length > 200 || LINE.trim().length === 0) {
  throw new Error(`LINE must be 1-200 chars, got ${LINE.length}`);
}
if (/[\u00a0\u200b\u200c\u200d\ufeff]/.test(LINE)) {
  throw new Error("LINE contains invisible characters");
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", LINE, "utf8");
chmodSync("/output/entry.txt", 0o644);

// Read-back: the file must hold exactly LINE, no trailing newline.
const written = readFileSync("/output/entry.txt", "utf8");
if (written !== LINE) {
  throw new Error("verifyWritten failed: entry.txt does not match LINE");
}
