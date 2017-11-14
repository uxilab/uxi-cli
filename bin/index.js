#! /usr/bin/env node
const exec = require('child_process').exec
const path = require('path')


const cmds = {
  test: 'jest'
}
const commandArg = process.argv[2]
const command = cmds[commandArg]
if (!command) {
  throw new Error('command not supported "' + commandArg +'"')
}
const args = [...process.argv].slice(3).join(' ')

console.log([...process.argv])
console.log('cwd :', process.cwd())
console.log('running npm run ' + command)

exec('npm root', function (err, stdout, stderr) {
  if (err) {
    console.warn(err)
    throw new Error(err)
  }

  const rootCWD = path.resolve(stdout, '../')
  console.log('rootCWD :', rootCWD)

  // $(npm root)
  const cmd = exec(
      `${command} ${args}`,
      { cwd: rootCWD },
      function (err, stdout, stderr) {
    if (err) {
      console.warn(err)
      throw new Error(err)
    }
    console.warn(err)
  });
  process.stdout.pipe(cmd.stdout)
  process.stderr.pipe(cmd.stderr)

})
