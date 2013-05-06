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
exports = module.exports = isNear;