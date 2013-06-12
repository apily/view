/**
 * view
 * View component
 *
 * @copyright 2013 Enrico Marino and Federico Spini
 * @license MIT
 */ 

/**
 * Expose `create_view`
 */

module.exports = create_view;

/**
 * Component dependencies
 */

var element = require('element')();

/**
 * view
 */

function create_view () {

  /**
   * view
   * Create a view.
   * 
   * @param {Object} options
   *   @param {Element} [options.container] element
   * @return {ViewModel} a viewmodel
   */

  function view (options) {
    if (!(this instanceof view)) {
      return new view(options);
    }
    var el = options.el;
    this.el = element(el);
  }

  /**
   * element
   */

  view.element = element;

  /**
   * use
   */

  view.use = function (fn) {
    fn(this);
    return this;
  };

  return view;
}
