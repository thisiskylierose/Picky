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

/* globals WURFL, yepnope */
/* jshint camelcase: false */

$(function() {
    'use strict';

    yepnope.injectJs('//wurfl.io/wurfl.js?debug=true', function () {
        yepnope({
            test : !WURFL.is_mobile,
            yep  : '//connect.facebook.net/en_GB/sdk.js#xfbml=1&appId=557732114291464&version=v2.0',
            callback : function() {
                var $asides = $('.site-asides');
                $asides.append('<div class="fb-like-box" data-href="https://www.facebook.com/welikethatsound" data-colorscheme="light" data-show-faces="true" data-header="true" data-stream="false" data-show-border="true"></div>');
            }
        });
    }, {
        charset: 'utf-8'
    }, 5000);

    // mmenu script
    $('#menu').removeClass('hidden').mmenu({
        // options
        slidingSubmenus: false
    }, {
        // configuration
        offCanvas: {
            pageNodetype: 'section'
        },
        classNames: {
            selected: 'active'
        }
    }).on('opened.mm',function () {
            toggleBurger();
        }).on('closed.mm', function () {
            toggleBurger();
        });

    var toggleBurger = function () {
        $('.burger').find('a').each(function () {
            if ($(this).is(':hidden')) {
                $(this).removeClass('hidden');
            } else {
                $(this).addClass('hidden');
            }
        });
    };

    // open menu
    $('#open-menu').click(function () {
        $('#menu').trigger('open.mm');
    });
    // close menu
    $('#close-menu').click(function () {
        $('#menu').trigger('close.mm');
    });
});



$(document).ready(function () {
    'use strict';

});