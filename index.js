
/**
 * view
 * View component
 *
 * @copyright 2013 Enrico Marino and Federico Spini
 * @license MIT
 */ 

/**
 * Expose `View`
 */

module.exports = View;

/**
 * Module dependencies
 */

var Emitter = require('emitter');
var domify = require('domify');
var guid = require('guid');

/**
 * View
 * Create a view.
 * 
 * @param {Object} options
 *   @param {Element} [options.el] element
 * @return {ViewModel} a viewmodel
 */

function View(options) {
  if (!(this instanceof View)) {
    return new View(options);
  }
  
  options = options || {};
  this.id = guid('view');
  this.el = domify(this.template)[0];
}

/**
 * Inherit from `Emitter`
 */

View.prototype = Object.create(Emitter.prototype);
View.prototype.constructor = View;

/**
 * @property template
 */

View.prototype.template = '<div></div>';

/**
 * @method render
 * 
 * @return {View} this for chaining
 * @api public
 */

View.prototype.render = function () {
  return this;  
};
