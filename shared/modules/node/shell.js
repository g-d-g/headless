/**
 * Headless node shell functions.
 *
 * @author   Patrick Schroen <ps@ufotechnologies.com>
 * @license  MIT Licensed
 */

/*jshint
 strict:true, eqeqeq:true, newcap:false, multistr:true, expr:true,
 loopfunc:true, shadow:true, node:true, indent:4
*/

if (!(typeof process !== 'undefined' && typeof process.send !== 'undefined')) {
    console.error("Headless shell needs to be executed from mothership");
}

var path = require('path');

var Shell = function () {};
utils.inherits(Shell, require('./files').constructor);

var user = process.argv[2].split(path.sep)[1],
    config = process.cwd()+path.sep+path.join('users', user, 'config.json');
Shell.prototype.user = user;
Shell.prototype.ghost = fs.existsSync(config) ? JSON.parse(fs.readFileSync(config).toString()) : {};
Shell.prototype.list = {path:process.argv[2], list:JSON.parse(fs.readFileSync(process.argv[2]).toString())};
Shell.prototype.index = parseInt(process.argv[3], 10);

function timeout(f, millisec) {
    "use strict";
    return setTimeout(function () {f();}, millisec);
}
Shell.prototype.setTimeout = timeout;

function interval(f, millisec) {
    "use strict";
    return setInterval(function () {f();}, millisec);
}
Shell.prototype.setInterval = interval;

// NodeJS to NodeJS bridge
function send(data) {
    "use strict";
    process.send(data);
}
Shell.prototype.send = send;

function exit(exit) {
    "use strict";
    if (exit) {
        shell.queue--;
    } else if (!shell.queue) {
        process.exit();
    } else {
        timeout(function () {
            shell.exit();
        }, 1000);
    }
}
Shell.prototype.exit = exit;

function kill() {
    "use strict";
    process.exit();
}
Shell.prototype.kill = kill;

process.on('message', function (payload) {
    "use strict";
    shell.receive(payload);
});

module.exports = exports = new Shell();