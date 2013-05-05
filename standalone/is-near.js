(function (window) {
    'use strict';

    /**
     * Module dependencies
     */
    var document = window.document,
        on = window.addEventListener || window.attachEvent,
        moveEvent = (window.attachEvent) ? 'onmousemove' : 'mousemove',
        mousePoint = {};

    on(moveEvent, function (eve) {

        var coordX = 0,
            coordY = 0;

        eve = eve || window.event;

        if (eve.pageX || eve.pageY) {
            coordX = eve.pageX;
            coordY = eve.pageY;

        } else {
            coordX = eve.clientX + doc.body.scrollLeft + docEl.scrollLeft;
            coordY = eve.clientY + doc.body.scrollTop + docEl.scrollTop;
        }

        mousePoint.x = coordX;
        mousePoint.y = coordY;

    });

    /**
     * Calculates if the mouse pointer position is near to a given element.
     * @function
     * @param {DOMElement} elementA - A given DOMElement.
     * @param {DOMElement} elementB - A given DOMElement.
     * @param {Number} delta - .
     * @returns {Boolean}
     */
    function isNear(element, delta) {

        var clientRect = element.getBoundingClientRect(),
            delta = delta || 100,
            shadow = {
                'top': clientRect.top - delta,
                'right': clientRect.right + delta,
                'bottom': clientRect.bottom + delta,
                'left': clientRect.left - delta
            },
            near = false;

        if ((mousePoint.x >= shadow.left && mousePoint.x <= shadow.right) && (mousePoint.y >= shadow.top && mousePoint.y <= shadow.bottom)) {

            if ((mousePoint.x >= clientRect.left && mousePoint.x <= clientRect.right) && (mousePoint.y >= clientRect.top && mousePoint.y <= clientRect.bottom)) {

                near = 'inside';

            } else {

                near = true;
            }

        } else {

            near = false;
        }

        return near;
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