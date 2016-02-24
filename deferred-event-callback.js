"use strict";

module.exports = function(options, callback) {
    if (!options.eventName) throw new Error('Missing eventName property in options object.');
    if (typeof options.callback !== 'function') throw new Error('Missing callback function.');

    if (window.attachEvent) {
        window.attachEvent('on' + options.eventName, function() {
            executeCallbackDeferred();
        });
    } else if (window.addEventListener) {
        window.addEventListener(options.eventName, function() {
            executeCallbackDeferred();
        }, true);
    } else {
        throw new Error('Neither attachEvent nor addEventListener found. Are you using a browser or a dishwasher?');
    }

    var id;
    function executeCallbackDeferred() {
        clearTimeout(id);
        id = setTimeout(callback, options.timeoutValue || 300);
    }
};