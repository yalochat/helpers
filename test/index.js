'use strict';

// Load Modules

var Helpers = require('../lib');
var Lab = require('lab');
var lab = exports.lab = Lab.script();
var Code = require('code');

var describe = lab.describe;
var it = lab.it;
var expect = Code.expect;

// Declare internals
var internals = {
    schedule: [
        {
            days: [
                1,
                3,
                5
            ],
            hours: [
                [
                    "0800",
                    "1300"
                ],
                [
                    "1400",
                    "2000"
                ]
            ]
        }
    ]
};

describe('Helper:', function () {
    
    it('Verify if function pad is well', function (done) {

        var number = '1';
        var newNumber = Helpers.pad(number, 2);

        expect(newNumber).to.equal('01');

        done();
    });

    it('Verify if store is opened by timeformat', function (done) {

        var isOpened = Helpers.isOpenStoreByTimeFormat(internals.schedule, 1, 900);

        expect(isOpened).to.equal(true);

        done();
    });

    it('Verify if store is not opened by timeformat', function (done) {

        var isOpened = Helpers.isOpenStoreByTimeFormat(internals.schedule, 2, 900);

        expect(isOpened).to.equal(false);

        done();
    });
});