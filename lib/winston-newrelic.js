'use strict';

var winston = require('winston'),
    util = require('util');
console.log('required');
/**
 * The winston-newrelic transporter constructor
 * @constructor
 * @type {Function}
 */
var WinstonNewrelic = module.exports = function(options) {
    if (!options) {
        options = {};
    }
    /**
     * Winston Trasporter Name
     * @type {string}
     */
    this.name = 'winston-newrelic';

    /**
     * Default logging level is error
     * @type {string}
     */
    this.level = options.level || 'error';

    /**
     * Take the injected instance or require it globally
     * @type {object}
     */
    this.newrelic = options.newrelic || require('newrelic');
};

/**
 * Inherit winston.Transport
 */
util.inherits(WinstonNewrelic, winston.Transport);

/**
 * Transporter getter for backward compatibility
 */
winston.transports.Newrelic = WinstonNewrelic;

/**
 * Dispatched on each log, stores only errors to new-relic
 * @param {string} level
 * @param {string} msg
 * @param {object} meta
 * @param {function} callback
 */
WinstonNewrelic.prototype.log = function(level, msg, meta, callback) {
    // Should support meta next on - consider JSON.stringify
    this.newrelic.noticeError(new Error(msg));

    callback(null, true);
};
