#! /usr/bin/env node
const exec = require('child_process').exec;
const path = require('path');
const pkg = require('../package.json');

const cmds = pkg.commands;

const commandArg = process.argv[2];
const command = cmds[commandArg];
if (!command) {
  throw new Error(`command not supported "${commandArg}"`);
}
const args = [...process.argv].slice(3).join(' ');

console.log([...process.argv]);
console.log('cwd :', process.cwd());
console.log(`running${command}`);

exec('npm root', (err, stdout, stderr) => {
  if (err) { throw new Error(err); }

  const rootCWD = path.resolve(stdout, '../');
  // console.log(`${command} ${args}`, 'running in', rootCWD)
  // console.log('rootCWD :', rootCWD)

  const cmd = exec(
    `${command} ${args}`,
    { cwd: rootCWD },
    (err, stdout, stderr) => {
      if (err) { console.warn(err); }
      if (stderr) { console.warn(stderr); }
      console.log(stdout);
      process.exit(0);
    });
  cmd.stdout.pipe(process.stdout);
  cmd.stderr.pipe(process.stderr);
  cmd.stdin.pipe(process.stdin);
});
