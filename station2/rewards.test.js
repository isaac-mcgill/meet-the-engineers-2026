const {
  AWARDS,
  getQuarter,
  sumPoints,
  canAward,
  getLeaderboard
} = require('./rewards.js');

let passed = 0, failed = 0;

const eq = (name, actual, expected) => {
  const a = JSON.stringify(actual), e = JSON.stringify(expected);
  if (a === e) { passed++; console.log('  PASS  ' + name); }
  else {
    failed++;
    console.log('  FAIL  ' + name);
    console.log('          expected ' + e);
    console.log('          actual   ' + a);
  }
};

const noThrow = (name, fn) => {
  try { fn(); passed++; console.log('  PASS  ' + name); }
  catch (e) {
    failed++;
    console.log('  FAIL  ' + name);
    console.log('          threw: ' + e.message);
  }
};

console.log('');
eq('getQuarter Jan', getQuarter('2026-01-15'), 1);
eq('getQuarter Mar', getQuarter('2026-03-28'), 1);
eq('getQuarter Jun', getQuarter('2026-06-30'), 2);
eq('getQuarter Dec', getQuarter('2026-12-20'), 4);
eq('sumPoints basic', sumPoints(AWARDS.slice(0, 2)), 350);
noThrow('sumPoints empty', () => {
  if (sumPoints([]) !== 0) throw new Error('expected 0');
});
eq('canAward under', canAward(1000, 500, 200), true);
eq('canAward exact', canAward(1000, 800, 200), true);
eq('canAward over',  canAward(1000, 900, 200), false);
eq('leaderboard top2', getLeaderboard(AWARDS, 2),
  [{ recipientId: 'u1', points: 825 }, { recipientId: 'u2', points: 600 }]);

console.log('\n  ' + passed + ' passed, ' + failed + ' failed\n');
