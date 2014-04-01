var LaunchpadApp = function (launchpad, listeners) {
  for (ev in listeners)
    launchpad.on(ev, listeners[ev].bind(launchpad));

  process.on('SIGINT', launchpad.stop.bind(launchpad));
  launchpad.midi.get.on('message', function (delta, msg) {
    var pos = (msg[0] == 144)
            ? [msg[1] % 16, 8 + ~(msg[1] / 16)]
            : [msg[1] - 104, 8];
    launchpad.emit('key', (msg[2] == 127), pos);
  });

  launchpad.emit('start');
  return launchpad;
}

LaunchpadApp.colors = require('./lib/colors.js');
LaunchpadApp.buttons = require('./lib/buttons.js');
LaunchpadApp.Launchpad = require('./lib/launchpad.js');

module.exports = LaunchpadApp;
