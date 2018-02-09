#!/usr/bin/env node
'use strict';

var program = require('commander');
var packageJSON = require('../package.json');
var convertBTC = require('./convert-btc');

program.version(packageJSON.version).description('Convert any currency to BTC value.').option('-C, currency <currency>', 'Currency to be converterd to BTC -- Default: USD').option('-A, amount <amount>', 'Value in BTC to convert -- Default: 1').parse(process.argv);

convertBTC(program.currency, program.amount);