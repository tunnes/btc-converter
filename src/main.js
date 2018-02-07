#!/usr/bin/env node

const program = require('commander');
const packageJSON = require('../package.json');

program
    .version(packageJSON.version)
    .parse(process.argv);