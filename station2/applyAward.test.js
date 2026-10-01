// Phase 2 self-check. Run with:  npm run station2:phase2
//
// These tests never look inside your `state` object. They only call
// createState() and applyAward(), so any internal shape you chose is fine.

const { createState, applyAward, QUARTERLY_BUDGET } = require('./rewards.js');

if (typeof createState !== 'function' || typeof applyAward !== 'function') {
  console.log('\n  Phase 2 is not written yet.\n');
  console.log('  rewards.js needs two functions:');
  console.log('    createState()            -> a fresh empty state');
  console.log('    applyAward(state, award) -> updates state, returns a result\n');
  console.log('  See the PHASE 2 block in station2/rewards.js.\n');
  process.exit(0);
}

let passed = 0, failed = 0;
const check = (name, cond, detail) => {
  if (cond) { passed++; console.log('  PASS', name); }
  else { failed++; console.log('  FAIL', name, detail ? '\n    ' + detail : ''); }
};

const award = (recipientId, points, date, managerApproved) =>
  ({ recipientId, points, date, managerApproved });

// --- a single accepted award -------------------------------------------
{
  const s = createState();
  const r = applyAward(s, award('u1', 250, '2026-01-15'));
  check('accepts a small award', r && r.accepted === true, 'got ' + JSON.stringify(r));
  check('reports newSpent of 250', r && r.newSpent === 250, 'got ' + JSON.stringify(r));
}

// --- accumulating within one quarter -----------------------------------
{
  const s = createState();
  applyAward(s, award('u1', 250, '2026-01-15'));
  const r = applyAward(s, award('u1', 300, '2026-02-10'));
  check('accumulates across awards in the same quarter',
    r && r.accepted === true && r.newSpent === 550, 'got ' + JSON.stringify(r));
}

// --- the 500-point approval rule ---------------------------------------
{
  const s = createState();
  const r = applyAward(s, award('u1', 501, '2026-01-15'));
  check('rejects >500 without manager approval', r && r.accepted === false,
    'got ' + JSON.stringify(r));
  check('gives a reason when rejecting', r && r.accepted === false && !!r.reason,
    'result had no reason field');
}
{
  const s = createState();
  const r = applyAward(s, award('u1', 501, '2026-01-15', true));
  check('accepts >500 with manager approval', r && r.accepted === true,
    'got ' + JSON.stringify(r));
}
{
  const s = createState();
  const r = applyAward(s, award('u1', 500, '2026-01-15'));
  check('500 exactly does NOT need approval', r && r.accepted === true,
    'the rule is "over 500", so 500 itself is fine. got ' + JSON.stringify(r));
}

// --- the quarterly budget ----------------------------------------------
{
  const s = createState();
  applyAward(s, award('u1', 500, '2026-01-15'));
  const r = applyAward(s, award('u1', 500, '2026-02-01'));
  check('allows spending up to exactly the budget',
    r && r.accepted === true && r.newSpent === QUARTERLY_BUDGET,
    'hitting the budget exactly is allowed. got ' + JSON.stringify(r));
}
{
  const s = createState();
  applyAward(s, award('u1', 500, '2026-01-15'));
  const r = applyAward(s, award('u1', 501, '2026-02-01', true));
  check('rejects an award that would exceed the budget', r && r.accepted === false,
    'got ' + JSON.stringify(r));
}
{
  const s = createState();
  applyAward(s, award('u1', 900, '2026-01-15', true));
  applyAward(s, award('u1', 500, '2026-02-01'));        // rejected: over budget
  const r = applyAward(s, award('u1', 100, '2026-02-20'));
  check('a rejected award consumes no budget',
    r && r.accepted === true && r.newSpent === 1000,
    'after 900 accepted + 500 rejected, 100 more should bring the total to 1000. got '
      + JSON.stringify(r));
}

// --- isolation between quarters, years, and recipients -----------------
{
  const s = createState();
  applyAward(s, award('u1', 900, '2026-01-15', true));
  const r = applyAward(s, award('u1', 900, '2026-05-02', true));
  check('each quarter has its own budget',
    r && r.accepted === true && r.newSpent === 900,
    'Q2 should start fresh. got ' + JSON.stringify(r));
}
{
  const s = createState();
  applyAward(s, award('u1', 900, '2026-01-15', true));
  const r = applyAward(s, award('u1', 900, '2027-01-15', true));
  check('Q1 of one year is separate from Q1 of the next',
    r && r.accepted === true && r.newSpent === 900,
    'these are two different quarters a year apart, so the 2027 award should '
      + 'start from zero. Does your state key include the year? got '
      + JSON.stringify(r));
}
{
  const s = createState();
  applyAward(s, award('u1', 900, '2026-01-15', true));
  const r = applyAward(s, award('u2', 900, '2026-01-20', true));
  check('each recipient has their own budget',
    r && r.accepted === true && r.newSpent === 900,
    'u2 should start fresh. got ' + JSON.stringify(r));
}

console.log('\n  ' + passed + ' passed, ' + failed + ' failed\n');

if (failed) {
  console.log('  These check behaviour, not design -- there are many correct');
  console.log('  shapes for `state`. If a test looks wrong to you, say so out');
  console.log('  loud: arguing with a spec is a legitimate move.\n');
}
