(function (window) {
    'use strict';

    /**
     * Module dependencies
     */

    var document = window.document,
        body = document.body,
        docEl = document.documentElement,
        on = window.addEventListener || window.attachEvent,
        moveEvent = (on === window.attachEvent) ? 'onmousemove' : 'mousemove',
        moved = false,
        requestAnimFrame = (function () {
            return window.requestAnimationFrame ||
                window.webkitRequestAnimationFrame ||
                window.mozRequestAnimationFrame ||
                function (callback) {
                    window.setTimeout(callback, 1000 / 60);
                };
        }()),
        eve,
        mousePosition = {};

    function update() {

        if (eve === undefined) { return; }

        var coordX = 0,
            coordY = 0;

        if (eve.pageX || eve.pageY) {
            coordX = eve.pageX;
            coordY = eve.pageY;

        } else {
            coordX = eve.clientX + body.scrollLeft + docEl.scrollLeft;
            coordY = eve.clientY + body.scrollTop + docEl.scrollTop;
        }

        mousePosition.x = coordX;
        mousePosition.y = coordY;

        eve = undefined;
    }

    on(moveEvent, function captureEvent(e) { eve = e || window.event; });

    (function updateloop() {
        requestAnimFrame(updateloop);
        update();
    }());

    /**
     * Calculates if the mouse position is near to a given element.
     * @function
     * @param {DOMElement} element - A given DOMElement.
     * @param {Number} [distance] - Minimum distance (in pixels) between the DOMElement and mouse position.
     * @returns {Boolean}
     */
    function isNear(element, distance) {

        distance = distance || 100;

        var rect = element.getBoundingClientRect(),
            area = {
                'top': rect.top - distance,
                'right': rect.right + distance,
                'bottom': rect.bottom + distance,
                'left': rect.left - distance
            },
            near = false,
            percentageX = 0,
            percentageY = 0;

        if ((mousePosition.x >= area.left && mousePosition.x <= area.right) && (mousePosition.y >= area.top && mousePosition.y <= area.bottom)) {

            if ((mousePosition.x >= rect.left && mousePosition.x <= rect.right) && (mousePosition.y >= rect.top && mousePosition.y <= rect.bottom)) {
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