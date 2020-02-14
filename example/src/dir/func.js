/**
 * Constant description
 *
 * @type {number}
 * @example
 * > constant
 * 1
 */
const constant = 1;

/**
 * Value description
 *
 * @type {string}
 */
let value = 's';

/**
 * Func A description
 *   first line of description
 *   second line of description
 third line of description
 *
 * > NOTE: markdown note
 * [see](http://github.com)
 *
 * @deprecated
 *
 * @param arg {number} - Arg description
 * @param args {number[]} - Args description
 *
 * @return {object} Return description
 * - name `string`: Name description
 * - age `number`: Age description
 *
 * @exception DeprecatedError: This function is deprecated
 * @exception LogicError
 *
 * @example
 * > funcA(1)
 * 1
 *
 * > funcA(2)
 * 2
 *
 * @example
 * > funcA({})
 {
   a:b
 }
 */
function funcA(arg, ...args) {

}

/**
 *
 */
function funcB() {

}

/**
 * Func X.B description
 *
 * @memberOf X
 */
function funcXB() {

}

/**
 * Func C description
 *
 * @private
 * @param arg {number|string}
 * @return {Promise<number|string>}
 */
async function funcC(arg) {

}

/**
 * Func D description
 *
 * @deprecated
 * @return {*}
 */
const funcD = () => {

};

// module.exports = {
//   funcA,
//   funcB,
// };
