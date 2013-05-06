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
     * Calculates if the mouse position is near to a given element.
     * @function
     * @param {DOMElement} element - A given DOMElement.
     * @param {Number} [padding] - Number of pixels to create transparent padding.
     * @returns {Boolean}
     */
    function isNear(element, padding) {

        padding = padding || 100;

        var clientRect = element.getBoundingClientRect(),
            shadow = {
                'top': clientRect.top - padding,
                'right': clientRect.right + padding,
                'bottom': clientRect.bottom + padding,
                'left': clientRect.left - padding
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

}(this));