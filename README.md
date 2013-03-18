# view

View component

## Installation

    $ component install apily/view

Remember to build your component doing

    $ component build

This will generate a file in build/build.js that you can import in your HTML file with:

```html
<script type="text/javascript" src="build/build.js"></script>
<script type="text/javascript">
  var View = require("view");
  ...
</script>
```

## Usage
### Create a view

Create a function that will inherit the `View` object and prototype.

```js
function MyView (options) {
  // create this.el using this.template
  View.call(this, options);
}

MyView.prototype = Object.create(View.prototype);
MyView.prototype.constructor = View;
```

### Template

This is what will be appended to `container` when passing `{container: domElement}` when creating a `new MyView()`

```js
MyView.prototype.template = '<div>Your template <button id="here">here</button></div>';
```

### Elements

Define elements (this will bind the element.key to a dom element):

```js
MyView.prototype.elements = {
  "mybutton": "#here"
  // find element in `this.el` using selector `'#mybutton'`
  // and cache it in `this.elements.mybutton` property
};
```


### Render the template

Although this function is not called in `apily/view`, you can use this function as you like.

```js
MyView.prototype.render = function () {
  // render
  // ...
  // no one calls this method
  // use this as you like

  return this;
};
```

### Events

You can bind events to user interactions.

```js
MyView.prototype.events = {
  "mouseover .secret": "showSecret",
  "click .mybutton": "clickMyButton"
};

MyView.prototype.showSecret = function (event) {
  console.log('shh... this is a secret message');
};

MyView.prototype.clickMyButton = function (event) {
  alert("touche'");
};
```

### Use it

Now that you created your `View` called `MyView`, you can now use it.

```js
var myapp = {};
var container = document.querySelector('.myapp');

myapp.view = new MyView({ container: container });

// or
// myapp.view = new MyView({});
// myapp.view.into(container);
```

## Example view usage

The best practice would be to create a component (or at least a separate file to require) for each View, and export it.

In your myView.js
```js
var View = require('view');
var template = require('./template.js');

module.exports = MyView;

function MyView (options) {
  View.call(this, options);
}

MyView.prototype = Object.create(View.prototype);
MyView.prototype.constructor = View;

MyView.prototype.template = template;

MyView.prototype.elements = {
  "mybutton": "#mybutton"
};

MyView.prototype.events = {
  "mouseover .secret": "onmouseover",
  "click .mybutton": "onclick"
};

MyView.prototype.onmouseover = function (event) {
  console.log('shh... this is a secret message');
};

MyView.prototype.onclick = function (event) {
  alert("touche'");
};
```

This would be your `app.js`

```js
var MyView = require('myview');

var myapp = {};
var container = document.querySelector('.myapp');

myapp.view = new MyView({ container: container });
```

## License

(The MIT License)

Copyright (c) 2013 Enrico Marino and Federico Spini

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.