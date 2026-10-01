# Station 3 — Prompt Problem

**You will not write any code at this station.** You write a *prompt*. Your AI writes the code.

## How it works

1. Work out what the program does by studying the table below. **That table is all you get.**
2. Write a prompt describing it. Ask your AI for:
   > a JavaScript function named `solve` that takes one string argument and returns one string
3. Paste the generated code into `solve.js`, **exactly as the AI gave it to you**.
4. Run `npm run station3`.
5. If cases fail, **edit your prompt and paste the new code. Never hand-edit the code.**

Step 5 is the whole exercise. The moment you patch the code yourself, this becomes an
ordinary coding problem and you stop practicing the thing we're here for.

## What the program does

| Input | Expected output |
|---|---|
| `"1.0 1.4 1.8 5.0 9.0"` | `1.40` |
| `"5.0 9.0 1.0 1.2 1.5"` | `1.23` |
| `"1.0 1.1 1.2 1.3 1.4"` | `1.10` |
| `"1.0 1.2 1.4 1.6 5.0"` | `1.20` |
| `"1.0 1.6 2.0 2.4 2.8"` | `2.00` |
| `"10.0 9.5 9.0 1.0 1.0"` | `9.50` |
| `"  4.0   4.5  5.0 1.0 2.0 "` | `4.50` |
| `"1.0 5.0 1.0 5.0 1.0"` | `ERROR: NO VALID SEQUENCE` |
| `"1.0 1.1 1.2"` | `ERROR: EXPECTED 5 VALUES` |
| `"1.0 20.0 1.2"` | `ERROR: EXPECTED 5 VALUES` |
| `"1.0 1.1 1.2 1.3 10.5"` | `ERROR: VALUE OUT OF RANGE` |
| `"0.5 1.0 1.2 1.3 1.4"` | `ERROR: VALUE OUT OF RANGE` |
| `"1.0 abc 1.2 1.3 1.4"` | `ERROR: VALUE OUT OF RANGE` |

Every rule you need is recoverable from this table. Read it carefully before you start typing.

## A note on prompt length

Some people pass all 13 with a 12-word prompt. Others need 90+. Neither is better — it
depends on how much the model guesses correctly on its own. Compare results, not word counts.
