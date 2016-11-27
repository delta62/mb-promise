[![Build Status](https://travis-ci.org/delta62/mb-promise.svg?branch=master)](https://travis-ci.org/delta62/mb-promise)
[![npm version](https://badge.fury.io/js/mb-promise.svg)](https://badge.fury.io/js/mb-promise)

# mb-promise

This package exposes a simple JavaScript API around the popular [Mountebank](http://www.mbtest.org/) stub server.

## Usage

``` js
const mb = require('mb-promise');

// Start up a  mountebank instance with the default options. Returns a 
// Promise so that you can respond to a successful start asynchronously.
mb.start().then(...);

// Pass custom configuration options into Mountebank. See the Mountebank
// documentation for more information.
mb.start({ loglevel: 'warn' }).then(...);

// You can also tell mb-promise when to stop the stub server. Returns a promise.
mb.stop().then(...);
```

## Known Issues

Mountebank keeps a hold on its log file after the main server process exits, so starting a Mountebank instance shortly after one was stopped may result in an error from the logger. There are commits in Mountebank that completely disable logfiles, but they have not been released yet.
