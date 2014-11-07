// Avoid `console` errors in browsers that lack a console.
(function() {
    var method;
    var noop = function () {};
    var methods = [
        'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
        'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
        'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
        'timeStamp', 'trace', 'warn'
    ];
    var length = methods.length;
    var console = (window.console = window.console || {});

    while (length--) {
        method = methods[length];

        // Only stub undefined methods.
        if (!console[method]) {
            console[method] = noop;
        }
    }
}());

// Place any jQuery/helper plugins in here.
var utils = utils || {};
// utils to subscribe your callbacks to only a url, like a inter page
utils.subscribeThisUrl = (function(){
    var callbacksFragment = [];

    SITE.router.on('route', function(){
        var currentFragment = Backbone.history.fragment,
            newArray = [];

        _.each(callbacksFragment, function(object, i){
            if (object.fragment !== currentFragment) {
                amplify.unsubscribe(object.name, object.callback);
            } else {
                newArray.push(object);
            }
        });

        callbacksFragment = newArray;
    });

    return function(name, callback, priority) {
        var fragment = Backbone.history.fragment;

        callbacksFragment.push({
            fragment: fragment,
            callback: callback,
            name: name
        });

        amplify.subscribe.apply(this, arguments);
    };

}());

