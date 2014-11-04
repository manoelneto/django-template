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

// put map callback here
var map_init = function() {
    amplify.publish('googleMapLoaded');
};

// Place any jQuery/helper plugins in here.
var utils = utils || {};

utils.script = (function(){

    var scripts = [];

    return {
        loadScript : function( url ) {
            if (scripts.length === 0) {
                this.getScripts();
            }

            if ( !this.hasScript(url) ) {
                this.insertScript(url);
            }
        },

        insertScript : function( url ) {
            scripts.push(url);
            var script = document.createElement('script');
            script.src = url;
            var fjs = document.getElementsByTagName('script')[0];
            fjs.parentNode.insertBefore(script, fjs);

        },

        hasScript : function( url ) {
            return _.find(scripts, function(script){
                return script === url;
            });
        },

        getScripts : function() {
            var scpts = document.getElementsByTagName('script');
            _.each(scpts, function(script){
                if ( script.src ) {
                    scripts.push(script.src);
                }
            });
        }
    };
}());

utils.promises = {
    maps: {
        load: new Promise(function(resolve, reject){
            amplify.subscribe('mapLoaded', function(){
                resolve();
            });
        }),
        init: new Promise(function(resolve, reject){
            amplify.subscribe('mapInited', function(){
                resolve();
            });
        })
    },
    facebook: {
        init : new Promise(function(resolve, reject){
            function initFb(){
                if (!initFb.inited) {
                    initFb.inited = true;

                    FB.init({
                        appId      : '1411310605748541',
                        version    : 'v1.0'
                    });

                    resolve();
                }
            }
            if ( !window.FB ) {
                window.fbAsyncInit = initFb;
            } else {
                initFb();
            }
        })
    },
    geolocation: {
        init: new Promise(function(resolve, reject){
            amplify.subscribe('approvedLocation', function(geoposition){
                resolve(geoposition);
            });

            amplify.subscribe('rejectLocation', function(){
                reject();
            });
        })
    }
};

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

// from google callback
var mapLoaded = function() {
    function initialize() {
        amplify.publish('mapLoaded');
    }
    google.maps.event.addDomListener(window, 'load', initialize);
};

utils.script.loadScript(SITE.config.googleMapsUrl);

