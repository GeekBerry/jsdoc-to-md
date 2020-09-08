/**
 * DirClass description
 */
class DirClass {
  /**
   * DirClass constructor description
   *
   * @param options {object}
   * @param options.num {number} - Number argument
   * @param [options.str=''] {string} - String argument
   * @return {Class} class instance
   *
   * @example
   * > new DirClass()
   * "DirClass"
   */
  constructor(options) {}

  /**
   * DirClass instance member
   */
  member() {
  }
}

/**
 * DirMemberClass description
 *
 * @memberOf DirClass
 */
class DirMemberClass {
  /**
   * DirMemberClass static member
   *
   * @deprecated
   * @exception DeprecatedError
   * @exception StaticError
   */
  static member() {

  }

  /**
   * DirMemberClass constructor
   */
  constructor() {

  }

  /**
   * DirMemberClass instance member
   */
  member() {
  }
}

module.exports = DirClass;
module.exports.DirMemberClass = DirMemberClass;
