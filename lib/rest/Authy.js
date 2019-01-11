'use strict';

/* jshint ignore:start */
/**
 * This code was generated by
 * \ / _    _  _|   _  _
 *  | (_)\/(_)(_|\/| |(/_  v1.0.0
 *       /       /
 */
/* jshint ignore:end */

var _ = require('lodash');  /* jshint ignore:line */
var Domain = require('../base/Domain');  /* jshint ignore:line */
var V1 = require('./authy/V1');  /* jshint ignore:line */


/* jshint ignore:start */
/**
 * Initialize authy domain
 *
 * @constructor
 *
 * @property {Twilio.Authy.V1} v1 - v1 version
 * @property {Twilio.Authy.V1.FormList} forms - forms resource
 * @property {Twilio.Authy.V1.ServiceList} services - services resource
 *
 * @param {Twilio} twilio - The twilio client
 */
/* jshint ignore:end */
function Authy(twilio) {
  Domain.prototype.constructor.call(this, twilio, 'https://authy.twilio.com');

  // Versions
  this._v1 = undefined;
}

_.extend(Authy.prototype, Domain.prototype);
Authy.prototype.constructor = Authy;

Object.defineProperty(Authy.prototype,
  'v1', {
  get: function() {
    this._v1 = this._v1 || new V1(this);
    return this._v1;
  }
});

Object.defineProperty(Authy.prototype,
  'forms', {
  get: function() {
    return this.v1.forms;
  }
});

Object.defineProperty(Authy.prototype,
  'services', {
  get: function() {
    return this.v1.services;
  }
});

module.exports = Authy;