(function () {
    'use strict';

    angular
        .module('app.core')
        .directive('ehFloatTopScroll', eh_float_top_scroll);

    eh_float_top_scroll.$inject = ['$window'];

    function eh_float_top_scroll($window) {

        var directive = {
            link: link,
            restrict: 'EA'
        };
        return directive;

        function link(scope, element, attrs) {
            var top = attrs.floatTop;
            var listenTo = attrs.listenForScrollTo;
            if (!!top && !isNaN(top)) {
                element.css({
                    position: 'fixed',
                    top: top + 'px',
                    'z-index': 132456
                });

                var position = top;
                scope.$on('eh:shrink-' + listenTo, function (event, args) {
                    position = (top - args);
                    element.css({
                        top: position + 'px'
                    });
                });
            }

        }
    }

})();