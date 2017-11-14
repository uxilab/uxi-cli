#! /usr/bin/env node
const exec = require('child_process').exec
const path = require('path')


const cmds = {
  test: 'node_modules/.bin/jest'
}
const commandArg = process.argv[2]
const command = cmds[commandArg]
if (!command) {
  throw new Error('command not supported "' + commandArg + '"')
}
const args = [...process.argv].slice(3).join(' ')

console.log([...process.argv])
console.log('cwd :', process.cwd())
console.log('running' + command)

exec('npm root', function (err, stdout, stderr) {
  if (err) {
    console.warn(err)
    throw new Error(err)
  }

  const rootCWD = path.resolve(stdout, '../')
  console.log(`${command} ${args}`, 'running in', rootCWD)
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
      console.warn(stderr)
      process.exit(0)
    });
  cmd.stdout.pipe(process.stdout)
  cmd.stderr.pipe(process.stderr)

})
