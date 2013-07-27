var isNear = (function(undefined) {
    
    /**
     * Module dependencies
     */
    var body = document.body,
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
            near = false;
    
        if ((mousePosition.x >= area.left && mousePosition.x <= area.right) && (mousePosition.y >= area.top && mousePosition.y <= area.bottom)) {
    
            if ((mousePosition.x >= rect.left && mousePosition.x <= rect.right) && (mousePosition.y >= rect.top && mousePosition.y <= rect.bottom)) {
                near = 'inside';
            } else {
                near = true;
            }
    
        } else {
            near = false;
        }
    
        return near;
    };
    
    /**
     * Expose isNear
     */
    return isNear;
    exports = module.exports = isNear;
}());
