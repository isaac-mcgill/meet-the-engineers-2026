# Station 2 — Debug & Extend

A small points/recognition program. It mostly works. Some tests don't.

```bash
npm run station2
```

AI is **optional** here. Use it or don't — nobody's counting. What matters is that you can
explain what the code does and why your change is correct.

---

## Phase 1 — Explore & Fix

Run the tests. Some pass, some fail. Read the code first, then make the failing ones pass.

**Don't rewrite what isn't broken.** The bugs are small. If you find yourself replacing a
whole function, stop and re-read it.

Before you change a line, try to say out loud: *"this test fails because ___."* If you
can't finish that sentence, you don't understand the bug yet.

## Phase 2 — Implement

Add a new function `applyAward(state, award)` where the placeholder comment is in
`rewards.js`.

Rules:
- Awards over **500 points** require `award.managerApproved === true`
- Nobody may exceed `QUARTERLY_BUDGET` within a single quarter
- Return `{ accepted: true, newSpent }` or `{ accepted: false, reason }`

**You choose the shape of `state`.** That's deliberate — it's the interesting decision in
this phase. Be ready to say why you picked it.

If you use AI for this, you still own the result. Read what it gives you and check it
against the rules above line by line.

## Phase 3 — Extend

No code required. Pick one and talk it through with an engineer:

- What's the time complexity of `getLeaderboard` if there are 2 million awards?
- Two people have the same points. What order should they come back in? What does the
  current code actually do?
- What breaks if points can be **revoked** (negative awards)?

---

### A note on pacing

**Most people don't get past Phase 1 tonight. That is completely fine.** Phase 1 done well
and explained clearly beats three phases rushed.
