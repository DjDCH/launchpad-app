launchpad-app
=============

A simple library for creating applications using the Novation Launchpad.

Installation
------------

First, download and install the Launchpad drivers from the Novation website:

* http://global.novationmusic.com/support/product-downloads?product=Launchpad

Then, add the following in your package.json file:

    "dependencies": {
      "launchpad-app": "git://github.com/DjDCH/launchpad-app.git"
    }

Finally, use npm to install the dependencies:

    npm install

Usage
-----

Add the following at the top of your main javascript file:

    var App = require('launchpad-app');

Create a Launchpad instance:

    var launchpad = new App.Launchpad();

Call the launchpad-app constructor with your Launchpad instance and listeners:

    App(launchpad, {
      start: function() { ... },
      key: function() { ... }
    });
