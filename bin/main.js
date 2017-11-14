#! /usr/bin/env node
import shell from 'shelljs'

const command = process.argv[3]

shell.exec(`npm run ${command}`);
