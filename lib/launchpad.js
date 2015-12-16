var EventEmitter = require('events').EventEmitter;
var util = require('util');
var midi = require('midi');

colors = require('./colors.js');
buttons = require('./buttons.js');

function Launchpad() {
  this.colors = colors;
  this.buttons = buttons;

  this.input = new midi.input();
  this.output = new midi.output();

  this.input.openPort(0);
  this.output.openPort(0);

  setImmediate(function() {
    this.bindInput();
    this.reset();

    this.emit('start');
  }.bind(this));
}

util.inherits(Launchpad, EventEmitter);

Launchpad.prototype.bindInput = function() {
  this.input.on('message', function(delta, msg) {
    var pos = (msg[0] == 144)
      ? [msg[1] % 16, 8 + ~(msg[1] / 16)]
      : [msg[1] - 104, 8];

    this.emit('key', (msg[2] == 127), pos);
  }.bind(this));
};

Launchpad.prototype.set = function(pos, color) {
  var msg = (pos[1] == 8)
          ? [176, 104 + pos[0], color]
          : [144, 112 + pos[0] - 16 * pos[1], color];
  this.output.sendMessage(msg);

  return this;
};

Launchpad.prototype.fill = function(color) {
  for (var i = 0; i < 32; i++) {
    this.output.sendMessage([146, color, color]);
  }

  return this;
};

Launchpad.prototype.reset = function() {
  this.output.sendMessage([176, 0, 0]);

  return this;
};

Launchpad.prototype.allOn = function() {
  this.output.sendMessage([176, 0, 126]);

  return this;
};

Launchpad.prototype.stop = function() {
  console.log(' Caught SIGINT, shutting down...');

  this.emit('stop');
  this.reset();

  this.input.closePort();
  this.output.closePort();

  setTimeout(process.exit, 500);
};

module.exports = Launchpad;
