const fs = require('fs');
const path = require('path');

// The cases printed in station3/README.md.
const VISIBLE = [
  ['1.0 1.4 1.8 5.0 9.0',       '1.40'],
  ['5.0 9.0 1.0 1.2 1.5',       '1.23'],
  ['1.0 1.1 1.2 1.3 1.4',       '1.10'],
  ['1.0 1.2 1.4 1.6 5.0',       '1.20'],
  ['1.0 1.6 2.0 2.4 2.8',       '2.00'],
  ['10.0 9.5 9.0 1.0 1.0',      '9.50'],
  ['  4.0   4.5  5.0 1.0 2.0 ', '4.50'],
  ['1.0 5.0 1.0 5.0 1.0',       'ERROR: NO VALID SEQUENCE'],
  ['1.0 1.1 1.2',               'ERROR: EXPECTED 5 VALUES'],
  ['1.0 20.0 1.2',              'ERROR: EXPECTED 5 VALUES'],
  ['1.0 1.1 1.2 1.3 10.5',      'ERROR: VALUE OUT OF RANGE'],
  ['0.5 1.0 1.2 1.3 1.4',       'ERROR: VALUE OUT OF RANGE'],
  ['1.0 abc 1.2 1.3 1.4',       'ERROR: VALUE OUT OF RANGE']
];

// Not published anywhere students can read them. Same rules, different data --
// these exist so a solution tuned to the visible table alone will not pass.
const HIDDEN = [
  ['2.0 2.4 2.8 9.0 1.0',     '2.40'],
  ['9.0 1.0 1.5 2.0 2.5',     '1.50'],
  ['10.0 10.0 10.0 1.0 2.0',  '10.00'],
  ['1.0 1.0 1.0 9.0 9.0',     '1.00'],
  ['4.4 4.8 5.2 1.0 2.0',     '4.80'],
  ['3.0 2.5 2.0 9.0 1.0',     '2.50'],
  ['1.0 1.1 1.4 9.0 1.0',     '1.17'],
  ['2.2 2.3 2.4 2.5 2.6',     '2.30'],
  ['5.0 5.6 6.2 6.8 7.4',     'ERROR: NO VALID SEQUENCE'],
  ['1.0 1.1 1.2 1.3 1.4 1.5', 'ERROR: EXPECTED 5 VALUES'],
  ['',                        'ERROR: EXPECTED 5 VALUES'],
  ['1.0 1.1 1.2 1.3 0.9',     'ERROR: VALUE OUT OF RANGE'],
  ['1.0 1.1 1.2 1.3 -2.0',    'ERROR: VALUE OUT OF RANGE']
];

const src = fs.readFileSync(path.join(__dirname, 'solve.js'), 'utf8');

let solve;
try {
  solve = new Function(src + '\n;return typeof solve === "function" ? solve : null;')();
} catch (e) {
  console.log('\n  Your pasted code could not run at all.');
  console.log('  ' + e.name + ': ' + e.message);
  console.log('\n  That is a bug in the generated code. Go back and adjust your prompt.\n');
  process.exit(1);
}

if (!solve) {
  console.log('\n  No function named solve(line) was found in station3/solve.js.');
  console.log('  Ask your AI for: a JavaScript function named solve that takes one');
  console.log('  string argument and returns one string.\n');
  process.exit(1);
}

function run(cases, label, show) {
  let pass = 0;
  const failures = [];
  cases.forEach(([input, expected], i) => {
    let actual, threw = null;
    try { actual = String(solve(input)).trim(); }
    catch (e) { threw = e.message; actual = '(threw)'; }

    const ok = !threw && actual === expected;
    if (ok) {
      pass++;
      if (show) console.log('  PASS  ' + JSON.stringify(input));
    } else {
      if (show) console.log('  FAIL  ' + JSON.stringify(input));
      failures.push(
        '  ' + label + ' case ' + (i + 1) + '  input ' + JSON.stringify(input) +
        '\n          expected  ' + expected +
        '\n          actual    ' + actual +
        (threw ? '\n          threw     ' + threw : '')
      );
    }
  });
  return { pass, failures, total: cases.length };
}

console.log('\n  VISIBLE CASES (the table in the README)\n');
const vis = run(VISIBLE, 'visible', true);

// Hidden cases run every time, but their details stay quiet until the visible
// ones are green -- 26 failures at once helps nobody.
const hid = run(HIDDEN, 'hidden', false);

console.log('\n  ' + vis.pass + ' / ' + vis.total + ' visible passing');
console.log('  ' + hid.pass + ' / ' + hid.total + ' hidden passing\n');

if (vis.failures.length) {
  console.log(vis.failures.join('\n\n'));
  if (hid.failures.length) {
    console.log('\n  Some hidden cases are failing too. Those details appear once');
    console.log('  every visible case passes -- work on these first.');
  }
  console.log('\n  Is the code wrong, or is your prompt wrong?');
  console.log('  Fix the prompt. Re-paste. Do not edit the code.\n');
} else if (hid.failures.length) {
  console.log('  Every visible case passes -- but the hidden ones do not.\n');
  console.log('  The hidden cases use the SAME rules as the table, just with');
  console.log('  different numbers. There is no new rule to discover. Your prompt');
  console.log('  described the examples more than it described the rule.\n');
  console.log(hid.failures.join('\n\n'));
  console.log('\n  Fix the prompt. Re-paste. Do not edit the code.\n');
} else {
  console.log('  All ' + (vis.total + hid.total) + ' cases pass, visible and hidden.');
  console.log('  Your prompt described the rule, not just the examples.\n');
  console.log('  Now try to make it SHORTER without breaking it.\n');
}
