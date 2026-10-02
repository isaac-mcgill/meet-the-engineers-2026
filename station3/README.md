# Station 3 — Prompt Problem

**You will not write any code at this station.** We want you to practice crafting a prompt and decomposing a problem into technical requirements.

## How it works

1. Write a prompt describing the task below. Start with:
   > Write me a JavaScript function named `solve` that takes one string argument and returns an array of strings. The function should...
2. Paste the generated code into `solve.js`, **exactly as the AI gave it to you**.
3. Run `npm run station3`.
4. If cases fail, **edit your prompt and paste the new code. Never hand-edit the code.**

## The task

Return every word in the text that begins with a vowel.

- Vowels are `a e i o u`. `y` is never a vowel.
- Case-insensitive: `Apple` and `apple` both count.
- Keep the original capitalization, keep duplicates, keep the order they appear in.
- Return `[]` if nothing matches.

## Examples

| Input | Output |
|---|---|
| `"an apple a day"` | `["an", "apple", "a"]` |
| `"Every good boy"` | `["Every"]` |
| `"I ate an orange!"` | `["I", "ate", "an", "orange"]` |
| `"yellow yams only"` | `["only"]` |
| `"The quick brown fox"` | `[]` |
| `""` | `[]` |
