import { exec } from 'child_process';
import { setTimeout } from 'timers';

const chalk = require('chalk');

const nock = require('nock');

const chai = require('chai');
const expect = chai.expect;
const converterBTC = require('../src/convert-btc');

const sinon = require('sinon');
const sinonChai = require('sinon-chai');

chai.use(sinonChai);

describe("Convert BTC", () => {
    let consoleStub;
    
    const responseMock = {
        "time": "2018-02-08 01:26:28",
        "success": true,
        "price": 7781.15
    };
    
    beforeEach(() => {
        consoleStub = sinon.stub(console, 'info');
    });

    afterEach(() =>{
        consoleStub.restore();
    });

    it("Should use currency USD and 1 as amount default.", async () => {
        // https://apiv2.bitcoinaverage.com/convert/global?from=BTC&toUSD&amount=1
        nock('https://apiv2.bitcoinaverage.com')
            .get('/convert/global')
            .query({from: 'BTC', to:'USD', amount: 1})
            .reply(200, responseMock)
        
        await converterBTC();
        expect(consoleStub).to.have.been.calledWith(`${chalk.red('1')} BTC to ${chalk.cyan('USD')} = ${chalk.yellow('7781.15')}`);
        
    });
    
    it("Should use currency BRL and 10 as amount.", async () => {
        nock('https://apiv2.bitcoinaverage.com')
            .get('/convert/global')
            .query({from: 'BTC', to:'BRL', amount: 10})
            .reply(200, responseMock)
        
        await converterBTC('BRL', 10);
        expect(consoleStub).to.have.been.calledWith(`${chalk.red('10')} BTC to ${chalk.cyan('BRL')} = ${chalk.yellow('7781.15')}`);

    });

    it("Should use currenty BRL and 1 as amount default.", async () => {
        nock('https://apiv2.bitcoinaverage.com')
            .get('/convert/global')
            .query({from: 'BTC', to:'BRL', amount: 1})
            .reply(200, responseMock)
        
        await converterBTC('BRL');
        expect(consoleStub).to.have.been.calledWith(`${chalk.red('1')} BTC to ${chalk.cyan('BRL')} = ${chalk.yellow('7781.15')}`);

    }); 
    
    it("Should show an error message when API fails", async () => {
        nock('https://apiv2.bitcoinaverage.com')
            .get('/convert/global')
            .query({from: 'BTC', to:'BRL', amount: 1})
            .replyWithError('Error')
        
        await converterBTC('BRL');
        expect(consoleStub).to.have.been.calledWith(chalk.red('Something went wrong in the API. Please try again in a few minutes.'));

    });
});