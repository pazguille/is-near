# is-near

Calculates if the mouse position is near to a given element.

It's cross-browser compatible:
- Chrome
- Firefox
- Opera
- Safari
- IE9
- IE8
- IE7

## Installation

    $ component install pazguille/is-near

See: [https://github.com/component/component](https://github.com/component/component)

### Standalone
Also, you can use the standalone version:
```html
<script src="is-near.js"></script>
```

## How-to

```js
var isNear = require('is-near'),
    box = document.getElementById('box');

document.addEventListener('mousemove', function () {
    var near = isNear(box, 50);

    if (near) {

        if (near === 'inside') {
            box.style.backgroundColor = '#8e44ad';
            box.innerHTML = 'Inside';
        } else {
            box.style.backgroundColor = '#2ecc71';
            box.innerHTML = 'Yes';
        }

    } else {
        box.style.backgroundColor = '#c0392b';
        box.innerHTML = 'No';
    }
});
```

## API

### isNear(element[, padding])
Calculates if the mouse position is near to a given `element`. Returns a boolean value (`true` or `false`) or string (`inside`).
- `element` - A given DOMElement.
- `padding` [optional] - Number of pixels to create transparent padding.

```js
isNear(someElement, 20);
```

## Contact
- Guillermo Paz (Frontend developer - JavaScript developer | Web standards lover)
- E-mail: [guille87paz@gmail.com](mailto:guille87paz@gmail.com)
- Twitter: [@pazguille](http://twitter.com/pazguille)
- Web: [http://pazguille.me](http://pazguille.me)

## License
### The MIT License
Copyright (c) 2013 [@pazguille](http://twitter.com/pazguille)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.