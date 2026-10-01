# Station 2 — Debug & Extend

A small points/recognition program with some failing tests.

```bash
npm run station2
```

AI is **optional** here. What matters is that you can
explain what the code does and why your change is correct.

---

## Phase 1 — Explore & Fix

Run the tests. Some pass, some fail. Read the code first, then make the failing ones pass.

**Don't rewrite what isn't broken.** The bugs are small. If you find yourself replacing a
whole function, stop and re-read it. Engineers are looking for understanding of *why* tests are failing.


## Phase 2 — Implement

Add a new function `applyAward(state, award)` where the placeholder comment is in
`rewards.js`, plus a `createState()` that returns a fresh empty state.

Rules:
- Awards over **500 points** require `award.managerApproved === true`
- Nobody may exceed `QUARTERLY_BUDGET` within a single quarter
- Return `{ accepted: true, newSpent }` or `{ accepted: false, reason }`
- `applyAward` updates `state` **in place**; `newSpent` is that recipient's total
  for that quarter after the award
- A rejected award must not consume any budget

**What's inside `state` is your decision** — that's the interesting part of this
phase. The tests never look inside it; they only call the two functions. Be ready
to explain why you shaped it the way you did.

Check your work:

```bash
npm run station2:phase2
```

This is a separate command, so it won't disturb your Phase 1 results.

## Phase 3 — Extend

No code required. Pick one and talk it through with an engineer:

- What's the time complexity of `getLeaderboard` if there are 2 million awards?
- Two people have the same points. What order should they come back in? What does the
  current code actually do?
- What breaks if points can be **revoked** (negative awards)?

---