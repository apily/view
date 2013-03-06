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
var selectors = require('selectors-map');
var delegates = require('delegate-manager');

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
  this.elements = selectors(this.el, this.elements);
  this.delegates = delegates(this.el, this);
  this.delegates.bind_all(this.events);
  this.listeners = [];
  
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
 * @property {String} template
 */

View.prototype.template = '<div></div>';

/**
 * @property {Object} elements
 */

View.prototype.elements = {};

/**
 * @property {Object} events
 */

View.prototype.events = {};

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
 * delegate
 * 
 * @param {String} event event name
 * @param {String} method method name
 * @return {View} this for chaining
 * @api public
 */

View.prototype.delegate = function (event, method) {
  this.delegates.bind(event, method);
  return this;
};

/**
 * delegate_all
 * 
 * @param {Object} events events map
 * @return {View} this for chaining
 * @api public
 */

View.prototype.delegate_all = function (events) {
  this.delegates.bind_all(events);
  return this;
};

/**
 * undelegate
 * 
 * @param {String} event event name
 * @param {String} method method name
 * @return {View} this for chaining
 * @api public
 */

View.prototype.undelegate = function (event, method) {
  this.delegates.unbind(event, method);  
  return this;
};

/**
 * undelegate_all
 * 
 * @param {String} event event name
 * @return {View} this for chaining
 * @api public
 */

View.prototype.undelegate_all = function (event) {
  this.delegates.unbind_all_of(event);  
  return this;
};

/**
 * listen
 * 
 * @param {Emitter} emitter emitter
 * @param {String} event event name
 * @param {String} method method name
 * @return {View} this for chaining
 * @api public
 */

View.prototype.listen = function (emitter, event, method) {
  if (typeof event === 'object') {
    this.listen_all(emitter, event);
    return this;
  }
  emitter.on(event, this[method], this);
  return this;
};

/**
 * listen_all
 * 
 * @param {Emitter} emitter emitter
 * @param {Object} events events map
 *   @key {String} event event name
 *   @value {String} method method name
 * @return {View} this for chaining
 * @api public
 */

View.prototype.listen_all = function (emitter, events) {
  var event;
  for (event in events) {
    this.listen(emitter, event, events[event]);    
  }
  return this;
};

/**
 * unlisten
 * 
 * @param {Emitter} emitter emitter
 * @param {String} event event name
 * @param {String} method method name
 * @return {View} this for chaining
 * @api public
 */

View.prototype.unlisten = function (emitter, event, method) {
  if (typeof event === 'object') {
    this.listen_all(emitter, event);
    return this;
  }
  emitter.off(event, this[method]);
};

/**
 * unlisten_all
 * 
 * @param {Emitter} emitter emitter
 * @param {Object} events events map
 *   @key {String} event event name
 *   @value {String} method method name
 * @return {View} this for chaining
 * @api public
 */

View.prototype.unlisten_all = function (emitter, events) {
  var event;
  for (event in events) {
    this.unlisten(emitter, event, events[event]);    
  }
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
  return this;
};

/**
 * @method show
 * @description show this view
 * @return {View} this for chaining
 * @api public
 */

View.prototype.show = function () {
  this.el.style.display = 'block';
  return this;
};

/**
 * @method hide
 * @description hide this view
 * @return {View} this for chaining
 * @api public
 */

View.prototype.hide = function () {
  this.el.style.display = 'none';
  return this;
};
