
// Utilizando o CommonJs:
const expect = require('chai').expect;

// Modulo que possibilita rodar comando como se estivesse no terminal:
const exec = require('child_process').exec;

// Comando:
const btcConverter = './src/main.js';

const packageJSON = require('../package.json');

describe("Main CLI", () => {
    it("Should return version of BTC Converter in console 'btc-converter --version' is executed..", (done) => {
        exec(`${btcConverter} --version`, (err, stdout, stderr) => {
            if(err) throw err;
            expect(stdout.replace('\n','')).to.be.equal(packageJSON.version);
            done();
        });
    });
    it("Should return the description of BTC Converter in console when 'btc-converter --help' is executed.", (done) => {
        exec(`${btcConverter} --help`, (err, stdout, stderr) => {
            if(err) throw err;
            expect(stdout.includes('Convert any currency to BTC value.')).to.be.true;
            done();
        });
    });
    it("Should contains the currency option in BTC Converter in console when 'btc-converter --help' is executed.", (done) => {
        exec(`${btcConverter} --help`, (err, stdout, stderr) => {
            if(err) throw err;
            expect(stdout.includes('currency')).to.be.true;
            done();
        });
    });
    it("Should contains the amount option in BTC Converter in console when 'btc-converter --help' is executed.", (done) => {
        exec(`${btcConverter} --help`, (err, stdout, stderr) => {
            if(err) throw err;
            expect(stdout.includes('amount')).to.be.true;
            done();
        });
    });
});