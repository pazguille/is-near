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
     * @param {Number} [distance] - Minimum distance (in pixels) between the DOMElement and mouse position.
     * @returns {Boolean}
     */
    function isNear(element, distance) {

        distance = distance || 100;

        var offset = {
                'top': element.offsetTop,
                'right': element.offsetLeft + element.clientWidth,
                'bottom': element.offsetTop + element.clientHeight,
                'left': element.offsetLeft
            },
            area = {
                'top': offset.top - distance,
                'right': offset.right + distance,
                'bottom': offset.bottom + distance,
                'left': offset.left - distance
            },
            near = false;

        if ((mousePoint.x >= area.left && mousePoint.x <= area.right) && (mousePoint.y >= area.top && mousePoint.y <= area.bottom)) {

            if ((mousePoint.x >= offset.left && mousePoint.x <= offset.right) && (mousePoint.y >= offset.top && mousePoint.y <= offset.bottom)) {
                near = 'inside';

            } else {
                // from the left
                if (mousePoint.x >= area.left && mousePoint.x <= offset.left) {
                  percentageX = (mousePoint.x - area.left) / (offset.left - area.left) * 100;

                // from the right
                } else if (mousePoint.x >= offset.right && mousePoint.x <= area.right) {
                  percentageX = (area.right - mousePoint.x) / (area.right - offset.right) * 100;

                }

                // from the top
                if (mousePoint.y >= area.top && mousePoint.y <= offset.top) {
                  percentageY = (mousePoint.y - area.top) / (offset.top - area.top) * 100;

                // from the bottom
                } else if (mousePoint.y >= offset.bottom && mousePoint.y <= area.bottom) {
                  percentageY = (area.bottom - mousePoint.y) / (area.bottom - offset.bottom) * 100;
                }

                percentageX = Math.floor(percentageX);
                percentageY = Math.floor(percentageY);

                near = [percentageX, percentageY];
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