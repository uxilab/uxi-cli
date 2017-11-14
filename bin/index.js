#! /usr/bin/env node
const exec = require('child_process').exec

const command = process.argv[2]
console.log([...process.argv])
console.log('cwd :', process.cwd())

const cmd = exec('npm run ' + command, function (err, stdout, stderr) {
  if (err) {
    console.warn(err)
    throw new Error(err)
  }
  console.log(stderr)
  console.log(stdout)
});
