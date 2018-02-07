
// Utilizando o CommonJs:
const expect = require('chai').expect;

// Modulo que possibilita rodar comando como se estivesse no terminal:
const exec = require('child_process').exec;

// Comando:
const btcConverter = './src/main.js';

const packageJSON = require('../package.json');

describe("Main CLI", () => {
    it("Should return version of BTC Converter in console.", (done) => {
        exec(`${btcConverter} --version`, (err, stdout, stderr) => {
            if(err) throw err;
            expect(stdout.replace('\n','')).to.be.equal(packageJSON.version);
            done();
        });
    });
});