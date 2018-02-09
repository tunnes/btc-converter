'use strict';

var request = require('request');
var chalk = require('chalk');
var ora = require('ora');

var spinner = ora({
    text: 'Retriving Bitcoin data...',
    color: 'green'
});

function convertBTC() {
    var currency = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'USD';
    var amount = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;

    var url = 'https://apiv2.bitcoinaverage.com/convert/global?from=BTC&to=' + currency + '&amount=' + amount;
    spinner.start();
    request(url, function (error, response, body) {
        var apiResponse = void 0;
        spinner.stop();

        try {
            apiResponse = JSON.parse(body);
        } catch (apiResponse) {
            console.log(chalk.red('Something went wrong in the API. Please try again in a few minutes.'));
            return apiResponse;
        }
        console.log(chalk.red(amount) + ' BTC to ' + chalk.cyan(currency) + ' = ' + chalk.yellow(apiResponse.price));
    });
}
module.exports = convertBTC;