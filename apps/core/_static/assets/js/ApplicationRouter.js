// preciso criar um router em que nele eu consiga criar paginas
// onde quando ele mudar pra paxina X ou Y, execute tal função
// passando a página antiga

SITE.Router = (function(){
    var Router = Backbone.Router.extend({
        initialize : function() {
            var self = this;
            this.on('route', function(router){

                if (self.lastRouter) {
                    if (self.transitions && self.transitions[self.lastRouter + '_to_' + router]) {
                        amplify.publish('page_change_' + self.lastRouter + '_to_' + router);
                    }
                }

                self.lastRouter = router;

            });
        }

    });


    // create your route
    // define a transitions object with
    // plenty of functions
    // from_to_to

    var PageRouter = Router.extend({
        // routes : {
        //     '' : 'home'
        // },

        // home : function() {
        //     console.log('home');
        //     try {
        //         SITE.home.init();
        //     } catch(err){}
        // },

        transitions : {
            places_to_home : function(){
                console.log('places to home');
            }
        }
    });

    return Router;

}());

SITE.router = new SITE.Router();