
/**
 * Require the given path.
 *
 * @param {String} path
 * @return {Object} exports
 * @api public
 */

function require(path, parent, orig) {
  var resolved = require.resolve(path);

  // lookup failed
  if (null == resolved) {
    orig = orig || path;
    parent = parent || 'root';
    var err = new Error('Failed to require "' + orig + '" from "' + parent + '"');
    err.path = orig;
    err.parent = parent;
    err.require = true;
    throw err;
  }

  var module = require.modules[resolved];

  // perform real require()
  // by invoking the module's
  // registered function
  if (!module.exports) {
    module.exports = {};
    module.client = module.component = true;
    module.call(this, module.exports, require.relative(resolved), module);
  }

  return module.exports;
}

/**
 * Registered modules.
 */

require.modules = {};

/**
 * Registered aliases.
 */

require.aliases = {};

/**
 * Resolve `path`.
 *
 * Lookup:
 *
 *   - PATH/index.js
 *   - PATH.js
 *   - PATH
 *
 * @param {String} path
 * @return {String} path or null
 * @api private
 */

require.resolve = function(path) {
  if (path.charAt(0) === '/') path = path.slice(1);

  var paths = [
    path,
    path + '.js',
    path + '.json',
    path + '/index.js',
    path + '/index.json'
  ];

  for (var i = 0; i < paths.length; i++) {
    var path = paths[i];
    if (require.modules.hasOwnProperty(path)) return path;
    if (require.aliases.hasOwnProperty(path)) return require.aliases[path];
  }
};

/**
 * Normalize `path` relative to the current path.
 *
 * @param {String} curr
 * @param {String} path
 * @return {String}
 * @api private
 */

require.normalize = function(curr, path) {
  var segs = [];

  if ('.' != path.charAt(0)) return path;

  curr = curr.split('/');
  path = path.split('/');

  for (var i = 0; i < path.length; ++i) {
    if ('..' == path[i]) {
      curr.pop();
    } else if ('.' != path[i] && '' != path[i]) {
      segs.push(path[i]);
    }
  }

  return curr.concat(segs).join('/');
};

/**
 * Register module at `path` with callback `definition`.
 *
 * @param {String} path
 * @param {Function} definition
 * @api private
 */

require.register = function(path, definition) {
  require.modules[path] = definition;
};

/**
 * Alias a module definition.
 *
 * @param {String} from
 * @param {String} to
 * @api private
 */

require.alias = function(from, to) {
  if (!require.modules.hasOwnProperty(from)) {
    throw new Error('Failed to alias "' + from + '", it does not exist');
  }
  require.aliases[to] = from;
};

/**
 * Return a require function relative to the `parent` path.
 *
 * @param {String} parent
 * @return {Function}
 * @api private
 */

require.relative = function(parent) {
  var p = require.normalize(parent, '..');

  /**
   * lastIndexOf helper.
   */

  function lastIndexOf(arr, obj) {
    var i = arr.length;
    while (i--) {
      if (arr[i] === obj) return i;
    }
    return -1;
  }

  /**
   * The relative require() itself.
   */

  function localRequire(path) {
    var resolved = localRequire.resolve(path);
    return require(resolved, parent, path);
  }

  /**
   * Resolve relative to the parent.
   */

  localRequire.resolve = function(path) {
    var c = path.charAt(0);
    if ('/' == c) return path.slice(1);
    if ('.' == c) return require.normalize(p, path);

    // resolve deps by returning
    // the dep in the nearest "deps"
    // directory
    var segs = parent.split('/');
    var i = lastIndexOf(segs, 'deps') + 1;
    if (!i) i = 0;
    path = segs.slice(0, i + 1).join('/') + '/deps/' + path;
    return path;
  };

  /**
   * Check if module is defined at `path`.
   */

  localRequire.exists = function(path) {
    return require.modules.hasOwnProperty(localRequire.resolve(path));
  };

  return localRequire;
};
require.register("is-near/index.js", function(exports, require, module){
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
}

/**
 * Expose isNear
 */
exports = module.exports = isNear;
});

