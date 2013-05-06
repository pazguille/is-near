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
            coordX = eve.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
            coordY = eve.clientY + document.body.scrollTop + document.documentElement.scrollTop;
        }

        mousePoint.x = coordX;
        mousePoint.y = coordY;

    });

    /**
     * Calculates if the mouse position is near to a given element.
     * @function
     * @param {DOMElement} element - A given DOMElement.
     * @param {Number} [padding] - Number of pixels to create transparent padding.
     * @returns {Boolean}
     */
    function isNear(element, padding) {

        padding = padding || 100;

        var offset = {
                'top': element.offsetTop,
                'right': element.offsetLeft + element.clientWidth,
                'bottom': element.offsetTop + element.clientHeight,
                'left': element.offsetLeft
            },
            area = {
                'top': offset.top - padding,
                'right': offset.right + padding,
                'bottom': offset.bottom + padding,
                'left': offset.left - padding
            },
            near = false;

        if ((mousePoint.x >= area.left && mousePoint.x <= area.right) && (mousePoint.y >= area.top && mousePoint.y <= area.bottom)) {

            if ((mousePoint.x >= offset.left && mousePoint.x <= offset.right) && (mousePoint.y >= offset.top && mousePoint.y <= offset.bottom)) {
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
        window.define('is-near', [], function () {
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