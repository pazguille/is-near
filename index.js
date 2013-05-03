(function (window) {
    'use strict';

    /**
     * Calculates the center of given element.
     * @function
     * @param {DOMElement} el - A DOM element to calculate its center.
     * @returns {Object}
     */
    function calculateCenter(el) {
        var clientRect = el.getBoundingClientRect();

        return {
            'x': clientRect.left + elA.clientHeight/2,
            'y': clientRect.top + el.clientWidth/2
        }
    }

    /**
     * Calculate distance between two points.
     * @function
     * @returns {Number}
     */
    function calculateDistance (a, b) {
        return Math.floor(Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2)));
    }

    /**
     * Calculates if a given point is near to an element.
     * @function
     * @returns {Boolean}
     */
    function isNear(el, points, delta) {
        delta = delta || 100;
        var pointA = calculateCenter(el),
            distance = calculateDistance(pointA, points),
            isnear = false;

        if (distance <= delta) {
            isnear = true;
        }

        return isnear;
    }

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