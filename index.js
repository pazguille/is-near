(function (window) {
    'use strict';

    /**
     * Create a new router.
     * @constructor
     * @property {array} paths
     * @property {string} regexp
     * @returns {Object}
     */
    function isNear(elA, points) {

    }

    // module.exports = function (el, selector) {
    //     var children = [].slice.call(el.children);

    //     return selector ? children.filter(function (el) {
    //         return matches(el, selector)
    //     }) : children
    // }

    /**
     * Expose isNear
     */
    // AMD suppport
    if (typeof window.define === 'function' && window.define.amd !== undefined) {
        window.define('isNear', [], function () {
            return isNear;
        });

    // CommonJS suppport
    } else if (typeof module !== 'undefined' && module.exports !== undefined) {
        module.exports = isNear;

    // Default
    } else {
        window.isNear = isNear;
    }

}(this));