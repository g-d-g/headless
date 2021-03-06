/**
 * Headless Hello World.
 *
 * @author   Patrick Schroen / https://github.com/pschroen
 * @license  MIT Licensed
 */

/* jshint strict:true, eqeqeq:true, newcap:false, multistr:true, expr:true, loopfunc:true, shadow:true, node:true, phantom:true, indent:4 */
/* globals shell */
"use strict";

var utils = require(shell.path+'/modules/utils'),
    Script = utils.Script(module.id, "Hello World");

/**
 * Initialize.
 *
 * @param    {Probe} probe Instance
 * @param    {undefined|Object} [load] Payload
 * @param    {undefined|initCallback} [callback]
 */
function init(probe, load, callback) {
    var name = load.name,
        id = load.id,
        box = {
            fields: {
                hello: {
                    type: 'info',
                    title: exports.name,
                    text: 'The Headless framework simply receives and sends JavaScript Objects as input and output. The name of this file is your webhook, for example; <a href="/hello" target="_blank">/hello</a>.'
                },
                payload: {
                    type: 'info',
                    title: "Payload",
                    text: JSON.stringify(load)
                }
            }
        };
    probe.log("["+exports.id+"] "+exports.name);
    callback(shell.box(name, id, [box]));
}
Script.prototype.init = init;

module.exports = exports = new Script();
