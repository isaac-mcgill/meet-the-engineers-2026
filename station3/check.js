const fs = require('fs');
const path = require('path');

const CASES = [
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

let pass = 0;
const failures = [];

console.log('');
CASES.forEach(([input, expected], i) => {
  let actual, threw = null;
  try { actual = String(solve(input)).trim(); }
  catch (e) { threw = e.message; actual = '(threw)'; }

  const ok = !threw && actual === expected;
  if (ok) {
    pass++;
    console.log('  PASS  ' + JSON.stringify(input));
  } else {
    console.log('  FAIL  ' + JSON.stringify(input));
    failures.push(
      '  case ' + (i + 1) + '  input ' + JSON.stringify(input) +
      '\n          expected  ' + expected +
      '\n          actual    ' + actual +
      (threw ? '\n          threw     ' + threw : '')
    );
  }
});

console.log('\n  ' + pass + ' / ' + CASES.length + ' passing\n');

if (failures.length) {
  console.log(failures.join('\n\n'));
  console.log('\n  Is the code wrong, or is your prompt wrong?');
  console.log('  Fix the prompt. Re-paste. Do not edit the code.\n');
} else {
  console.log('  All cases pass.');
  console.log('  Now try to make your prompt SHORTER without breaking it.\n');
}
