#! /usr/bin/env node
const exec = require('child_process').exec;
const path = require('path');
// const npmRun = require('npm-run');
const pkg = require('../package.json');
// const readline = require('readline')

process.stdin.setEncoding('utf8');

const cmds = pkg.commands;

const commandArg = process.argv[2];
const command = cmds[commandArg];
if (!command) {
  console.log(`command not supported "${commandArg === undefined ? '' : commandArg}"

  List of available commands:
${Object.keys(cmds).map(c => `  - ci-ops ${c}`).join('\n')}
`);
}
const args = [...process.argv].slice(3).join(' ');

/*
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: 'OHAI> ',

});
rl.prompt();
rl.on('line', (input) => {
  console.log(`Received: ${input}`);
});
*/

// console.log([...process.argv]);
// console.log('cwd :', process.cwd());
// console.log(`running${command}`);

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

  // const rl = readline.createInterface({
  //   input: cmd.stdin,
  //   output: cmd.stdin,
  //   prompt: 'OHAI> '

  // });
  // rl.prompt();
  // rl.on('line', (input) => {
  //   console.log(`Received: ${input}`);
  // });

  const stdin = process.openStdin();
  stdin.addListener('data', (d) => {
    console.log('user iinput', d);
    cmd.stdin.pipe(stdin);
  });
  const cmdStdin = process.openStdin();

  cmd.on('close', (code) => {
    console.log(`child process exited with code ${code}`);
  });

  cmd.on('data', (code) => {
    console.log(`child process exited with code ${code}`);
  });

  cmd.stdout.pipe(process.stdout);
  cmd.stderr.pipe(process.stderr);
  // cmd.stdin.pipe(process.stdin);
});
