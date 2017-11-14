#! /usr/bin/env node
const exec = require('child_process').exec
const path = require('path')
const command = [...process.argv].slice(2).join(' ')

console.log([...process.argv])
console.log('cwd :', process.cwd())
console.log('running npm run ' + command)

// $(npm root)
exec('npm root', function (err, stdout, stderr) {
  if (err) {
    console.warn(err)
    throw new Error(err)
  }

  const rootCWS = path.resolve(stdout, '../')
  console.log('rootCWS :', rootCWS)
  exec(`npm run ${command}`, { cwd: rootCWS }, function (err, stdout, stderr) {
    if (err) {
      console.warn(err)
      throw new Error(err)
    }
    console.log(stderr, stdout)
  });
});
