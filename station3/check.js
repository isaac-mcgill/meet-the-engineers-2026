const fs = require('fs');
const path = require('path');

const VISIBLE = [
  ['an apple a day',      ['an', 'apple', 'a']],
  ['Every good boy',      ['Every']],
  ['I ate an orange!',    ['I', 'ate', 'an', 'orange']],
  ['yellow yams only',    ['only']],
  ['The quick brown fox', []],
  ['',                    []]
];

const HIDDEN = [
  ['(apple) banana',             ['apple']],
  ['  extra   spaces  here  ',   ['extra']],
  ['tabs\tand\nnewlines are ok', ['and', 'are', 'ok']],
  ["I'm an engineer",            ["I'm", 'an', 'engineer']],
  ['e-mail is useful',           ['e-mail', 'is', 'useful']],
  ['...',                        []],
  ['"Over" there',               ['Over']],
  ['3rd item',                   ['item']],
  ['UPPER CASE ONLY',            ['UPPER', 'ONLY']],
  ['an an an',                   ['an', 'an', 'an']],
  ['Hello, everyone -- are you okay?', ['everyone', 'are', 'okay']],
  ['...odd...',                  ['odd']],
  ['a',                          ['a']]
];

const src = fs.readFileSync(path.join(__dirname, 'solve.js'), 'utf8');

let solve;
try {
  solve = new Function(src + '\n;return typeof solve === "function" ? solve : null;')();
} catch (e) {
  console.log('\n  Your pasted code could not run.\n  ' + e.name + ': ' + e.message);
  console.log('\n  That is a bug in the generated code. Adjust your prompt.\n');
  process.exit(1);
}

if (!solve) {
  console.log('\n  No function named solve(text) found in solve.js.');
  console.log('  Ask your AI for a function named solve that takes a string');
  console.log('  and returns an array of strings.\n');
  process.exit(1);
}

const show = v => Array.isArray(v) ? '[' + v.map(x => JSON.stringify(x)).join(', ') + ']' : String(v);
const same = (a, b) => Array.isArray(a) && a.length === b.length && a.every((x, i) => x === b[i]);

function run(cases, label, verbose) {
  let pass = 0;
  const fails = [];
  cases.forEach(([input, expected], i) => {
    let actual, threw = null;
    try { actual = solve(input); }
    catch (e) { threw = e.message; }

    const ok = !threw && same(actual, expected);
    if (ok) pass++;
    if (verbose) console.log('  ' + (ok ? 'PASS' : 'FAIL') + '  ' + JSON.stringify(input));
    if (!ok) {
      fails.push('  ' + label + ' ' + (i + 1) + '  ' + JSON.stringify(input) +
        '\n       expected  ' + show(expected) +
        '\n       actual    ' + (threw ? 'threw: ' + threw : show(actual)));
    }
  });
  return { pass, fails, total: cases.length };
}

console.log('');
const vis = run(VISIBLE, 'visible', true);
const hid = run(HIDDEN, 'hidden', false);

console.log('\n  ' + vis.pass + ' / ' + vis.total + ' visible');
console.log('  ' + hid.pass + ' / ' + hid.total + ' hidden\n');

if (vis.fails.length) {
  console.log(vis.fails.join('\n\n'));
  if (hid.fails.length) console.log('\n  Hidden cases are failing too. Details once visible all pass.');
  console.log('\n  Fix the prompt. Re-paste. Do not edit the code.\n');
} else if (hid.fails.length) {
  console.log('  Visible all pass. Hidden do not — the hidden cases are messier text.\n');
  console.log(hid.fails.join('\n\n'));
  console.log('\n  Fix the prompt. Re-paste. Do not edit the code.\n');
} else {
  console.log('  All ' + (vis.total + hid.total) + ' pass. Now make your prompt shorter.\n');
}
