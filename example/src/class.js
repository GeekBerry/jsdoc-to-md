/**
 * Class description
 *
 * @example
 * > new Class()
 * "Class"
 *
 * > new Class({})
 "Class"
 */
class Class {
  /**
   * @param options {object}
   * @param options.num {number} - Number argument
   * @param [options.str=''] {string} - String argument
   * @return {Class} class instance
   */
  constructor(options) {
    /**
     * Instance attribute description
     *
     * @type {number}
     */
    this.num = 1;
  }

  /**
   * Static function description
   * > NOTE: method note
   *
   * @param arg {number}
   * @param options {object}
   */
  static func(arg, options) {

  }

  /**
   * Attribute getter
   *
   * @return {string}
   * @example
   * > cls.attr
   * "xxx"
   */
  get attr() {

  }

  /**
   * Attribute setter
   *
   * @param value {string}
   *
   * @example
   * > cls.attr = "yyy"
   */
  set attr(value) {

  }

  /**
   * Method description
   *
   * @param args {number[]} - Args description
   * @return {number} - Return description
   *
   * @example
   * > cls.method(1,2,3)
   6

   * @example
   * > cls.method(1,2,3,4)
   10
   */
  method(...args) {

  }

  /**
   * Protected method description
   *
   * @protected
   */
  _protectedMethod() {

  }

  /**
   * Private method description
   *
   * @private
   */
  _privateMethod() {

  }

  /**
   * Async method description
   *
   * @public
   * @param arg {number} - Arg description
   * @param args {number[]} - Args description
   * @return {Promise<number>}
   */
  async _asyncMethod(arg, ...args) {

  }

}

module.exports = Class;
