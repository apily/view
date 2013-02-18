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
 *   @param {Element} [options.container] element
 * @return {ViewModel} a viewmodel
 */

function View(options) {
  if (!(this instanceof View)) {
    return new View(options);
  }
  
  var options = options || {};
  var container = options.container;
  
  this.id = guid('view');
  this.el = domify(this.template)[0];
  
  if (container) {
    this.container = container;
    this.container.appendChild(this.el);
  }
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

/**
 * @method into
 * @description append this view into `container`
 * @param {Element} container container
 * @return {View} this for chaining
 * @api public
 */

View.prototype.into = function (container) {
  container.appendChild(this.el); 
  this.container = container;
};

/**
 * @method show
 * @description show this view
 * @return {View} this for chaining
 * @api public
 */

View.prototype.show = function () {
  this.el.style.display = 'block';
};

/**
 * @method hide
 * @description hide this view
 * @return {View} this for chaining
 * @api public
 */

View.prototype.hide = function () {
  this.el.style.display = 'none';
};
