SITE.ieForm = (function(){

    function init() {
        $('[placeholder]').each(function(){
            $(this).val($(this).attr('placeholder'));
        }).focus(function(){
            if ( $(this).val() === $(this).attr('placeholder') ) {
                $(this).val('');
            }
        }).blur(function(){
            if ( $(this).val() === '' ) {
                $(this).val($(this).attr('placeholder'));
            }
        });
    }

    // peguei do código do angular.js
    function isString(value){return typeof value === 'string';}
    var lowercase = function(string){return isString(string) ? string.toLowerCase() : string;};
    var msie = parseInt((/msie (\d+)/.exec(lowercase(navigator.userAgent)) || [])[1]);

    if (msie <= 9) {
        init();
    }

    return {
        init : init
    };

}());