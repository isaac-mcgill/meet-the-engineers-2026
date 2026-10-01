# Station 3 — Prompt Problem

**You will not write any code at this station.** You write a *prompt*. Your AI writes the code.

## How it works

1. **Ask the engineer to describe the problem out loud.** The requirements are
   given verbally and are not written down anywhere — the only thing you get in
   writing is the table below. Ask as many follow-up questions as you want.
2. Study the table and work out what the program does. **The table plus what the
   engineer tells you is all you get.**
3. Write a prompt describing it. Start your prompt with:
   > Write me a JavaScript function named `solve` that takes one string argument and returns one string. The function should...
4. Paste the generated code into `solve.js`, **exactly as the AI gave it to you**.
5. Run `npm run station3`.
6. If cases fail, **edit your prompt and paste the new code. Never hand-edit the code.**

> Writing the spec out in your own words is the whole exercise. You cannot
> copy-paste it into your AI, because nobody will hand it to you in text.


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

## There are hidden cases too

`npm run station3` also runs a set of **hidden cases you cannot see**. They use
the *same* rules with different numbers — there is no extra rule to discover.

So the table is a set of *examples*, not the specification. A prompt that
describes those seven numbers will pass the visible cases and fail the hidden
ones. A prompt that describes the underlying **rule** passes both.

Hidden failures stay quiet until all the visible cases pass, so you only ever
have one problem in front of you at a time.
