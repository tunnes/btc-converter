const request = require('request');
const chalk = require('chalk');
const ora = require('ora');

const spinner = ora({
    text: 'Retriving Bitcoin data...',
    color: 'green'
})

function convertBTC(currency = 'USD', amount = 1) {
    const url = `https://apiv2.bitcoinaverage.com/convert/global?from=BTC&to=${currency}&amount=${amount}`;
    spinner.start();
    request(url, (error, response, body) => {
        let apiResponse;
        spinner.stop();

        try{
            apiResponse = JSON.parse(body)
        }catch(apiResponse){
            console.log(chalk.red('Something went wrong in the API. Please try again in a few minutes.'))
            return apiResponse;
        }
        console.log(`${chalk.red(amount)} BTC to ${chalk.cyan(currency)} = ${chalk.yellow(apiResponse.price)}`);
    });
}
module.exports = convertBTC;