#!/usr/bin/env node

const program = require('commander');
const packageJSON = require('../package.json');
const convertBTC = require('./convert-btc');

program
    .version(packageJSON.version)
    .description('Convert any currency to BTC value.')
    .option('-C, currency <currency>', 'Currency to be converterd to BTC -- Default: USD')
    .option('-A, amount <amount>', 'Value in BTC to convert -- Default: 1')
    .parse(process.argv);

convertBTC(program.currency, program.amount);