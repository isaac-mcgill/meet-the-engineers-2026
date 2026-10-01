// ============================ data ============================
const AWARDS = [
  { id: 'a1', recipientId: 'u1', points: 250, date: '2026-01-15', type: 'PEER' },
  { id: 'a2', recipientId: 'u2', points: 100, date: '2026-02-03', type: 'PEER' },
  { id: 'a3', recipientId: 'u1', points: 500, date: '2026-03-28', type: 'MILESTONE' },
  { id: 'a4', recipientId: 'u3', points: 150, date: '2026-04-02', type: 'PEER' },
  { id: 'a5', recipientId: 'u2', points: 300, date: '2026-06-30', type: 'SPOT' },
  { id: 'a6', recipientId: 'u1', points: 75,  date: '2026-07-04', type: 'PEER' },
  { id: 'a7', recipientId: 'u3', points: 450, date: '2026-11-11', type: 'MILESTONE' },
  { id: 'a8', recipientId: 'u2', points: 200, date: '2026-12-20', type: 'SPOT' }
];

const QUARTERLY_BUDGET = 1000; // points per recipient, per quarter

// ============================ helpers ============================

/** Returns the calendar quarter (1-4) for an ISO date string. */
function getQuarter(dateStr) {
  const month = Number(dateStr.slice(5, 7));
  return Math.floor(month / 3) + 1;
}

/** Total points across a list of awards. */
function sumPoints(awards) {
  return awards.map(a => a.points).reduce((a, b) => a + b);
}

/** Can `amount` more points be granted without exceeding `budget`? */
function canAward(budget, spent, amount) {
  return spent + amount < budget;
}

/** Top `limit` recipients by total points, highest first. */
function getLeaderboard(awards, limit) {
  const totals = [];
  for (const a of awards) {
    let found = null;
    for (const t of totals) {
      if (t.recipientId === a.recipientId) found = t;
    }
    if (found) found.points += a.points;
    else totals.push({ recipientId: a.recipientId, points: a.points });
  }
  totals.sort((x, y) => y.points - x.points);
  return totals.slice(0, limit);
}

// ========================= PHASE 2 GOES HERE =========================
// Add applyAward(state, award) here.
//   - Awards over 500 points require award.managerApproved === true
//   - A recipient may not exceed QUARTERLY_BUDGET in any single quarter
//   - Return { accepted: true, newSpent } or { accepted: false, reason }
//   - You decide the shape of `state`
// =====================================================================

module.exports = {
  AWARDS,
  QUARTERLY_BUDGET,
  getQuarter,
  sumPoints,
  canAward,
  getLeaderboard
};
