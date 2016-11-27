'use strict';

const mb     = require('./index.js'),
  describe   = require('mocha').describe,
  it         = require('mocha').it,
  before     = require('mocha').before,
  Wreck      = require('wreck'),
  expect     = require('code').expect,
  stubConfig = require('./stub-config.json');

let instance;

describe('Starting the server', () => {
  before(() => {
    let opts = { loglevel: 'warn' };
    instance = mb.start(opts);
  });

  it('should return a promise', () => {
    expect(instance.then).to.be.a.function();
  });

  it('should allow creation of impostors', done => {
    let opts = { payload: stubConfig };
    instance.then(() => {
      Wreck.post('http://localhost:2525/imposters', opts, done);
    });
  });

  it('should respond with mock data', done => {
    instance.then(() => {
      Wreck.get('http://localhost:4545/', (err, res, body) => {
        if (err) return done(err);
        expect(body.toString()).to.equal('hello world');
        expect(res.statusCode).to.equal(200);
        done();
      });
    });
  });
});

describe('Stopping the server', () => {
  it('should return a promise', () => {
    let promise = mb.stop();
    expect(promise.then).to.be.a.function();
    return promise;
  });

  it('should no longer allow creation of impostors', done => {
    let opts = { payload: stubConfig };
    Wreck.post('http://localhost:2525/imposters', opts, err => {
      expect(err).to.be.an.error();
      done();
    });
  });
});
