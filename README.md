# Meet the Engineers Night

Practice problems for our outreach night. Free to run, nothing to install, no accounts.

## For students

**Open this link — no download, no login, no account.**

### 👉 https://stackblitz.com/github/isaac-mcgill/meet-the-engineers-2026

You get a real editor and a real terminal in your browser.

### Run the stations

```bash
npm run station2    # Debug & Extend — run the failing tests
npm run station3    # Prompt Problem — check your AI's code
```

> **Heads up:** without signing in, StackBlitz does not save your work. Don't refresh the tab
> mid-problem. (Signing in with GitHub to persist is optional and entirely your call.)

## Stations

| Station | Folder | AI |
|---|---|---|
| **1 — Classic** | links out to LeetCode (free) | off |
| **2 — Debug & Extend** | [`station2/`](station2/) | optional |
| **3 — Prompt Problem** | [`station3/`](station3/) | required |

### Station 1 — Classic
Two standard interview problems, free on LeetCode, **any language**:
- [Valid Parentheses](https://leetcode.com/problems/valid-parentheses/) (easy)
- [Merge Intervals](https://leetcode.com/problems/merge-intervals/) (medium)

> **Before you arrive:** make a free LeetCode account and verify your email.
> Viewing a problem is anonymous, but *running* or *submitting* code requires sign-in.
> Doing this at home saves you ten minutes on venue wifi.

No account and don't want one? Write your solution in StackBlitz instead — you lose
auto-grading, but an engineer can still walk through it with you.

### Station 2 — Debug & Extend
`station2/rewards.js` is a small points program. Ten tests, **five of them fail**. Three phases:
fix the failures, add a feature, then improve the design. Run with `npm run station2`.

### Station 3 — Prompt Problem
You don't write code. You write a *prompt*; your AI writes the code; you paste it into
`station3/solve.js` and run `npm run station3`. See [`station3/README.md`](station3/README.md).

---

## Setup (organizers)

The repo is published and the StackBlitz link works as soon as the repo is public.
Remaining before the event:

1. **Open the StackBlitz link on a school-like network** and confirm
   `npm run station2` prints `5 passed, 5 failed`. If that works, both stations work.
2. **Print QR codes** for the StackBlitz link and put one on every table.
3. **Send a pre-event email** telling students to create and verify a free LeetCode
   account beforehand (needed for Station 1 only), and to bring a laptop plus whatever
   AI tool they already use.
4. **Brief volunteers** with the answer keys — the three Station 2 bugs and the three
   Station 3 traps. Those live in the volunteer guide, not in this repo.

> **No offline fallback is published.** If the venue loses internet, the night stops.
> A self-contained single-file version of Stations 1–3 exists and can be added if that
> risk is worth covering — it needs no network at all.

### Verify before the event

```bash
node station2/rewards.test.js     # must print: 5 passed, 5 failed
node station3/check.js            # must print: No function named solve(line) was found
```

### Cost

Nothing. Public GitHub repos, StackBlitz anonymous use, and the LeetCode free tier are
all free. No business subscription is required anywhere.

### Notes

- Stations 2 and 3 are **JavaScript only**. Station 1 is any language, via LeetCode.
- Everything is reusable next year. Nothing expires.

## Volunteers

Answer keys, coaching notes, and what to say at each station are in the volunteer guide
(kept separately — **do not commit it to this public repo**, students can read it here).
