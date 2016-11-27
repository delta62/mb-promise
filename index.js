'use strict';

const mb = require('mountebank');

let server,
  defaults = {
    port: 2525,
    pidfile: 'mb.pid',
    logfile: 'mb.log',
    loglevel: 'info',
  };

exports.start = function mbStart(opts) {
  if (server) {
    return Promise.resolve(server);
  }

  opts = Object.assign({ }, defaults, opts);
  return mb.create(opts)
    .then(instance => server = instance);
};

exports.stop = function mbStop() {
  if (!server) {
    return Promise.resolve();
  }
  return new Promise(resolve => {
    server.close(resolve);
  });
};
