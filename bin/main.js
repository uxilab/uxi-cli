#! /usr/bin/env node
const exec = require('process').child_process

const command = process.argv[3]

console.log(process.cwd())

exec('npm run ' + command, function () {

});
