(function () {
    'use strict';

    angular
        .module('app.core')
        .directive('ehShrinkScroll', eh_shrink_scroll);

    eh_shrink_scroll.$inject = [];

    function eh_shrink_scroll() {
        // Usage:
        //     <eh-shrink-scroll></eh-shrink-scroll>
        // Creates:
        // 
        var directive = {
            link: link,
            restrict: 'A'
        };
        return directive;

        function link(scope, element, attrs) {
            var listenTo = attrs.listenForScrollTo;
            var shrink = attrs.shrinkValue;
            var height = element[0].offsetHeight;
            element.css({
                height: height + 'px !important',
                'min-height': height + 'px !important'
            });
            scope.$on('eh:shrink-' + listenTo, function (event, args) {
                var targetHeight = args === 0 ? height : (args > shrink ? height - shrink : height - args);
                element.css({
                    height: targetHeight + 'px !important',
                    'min-height': targetHeight + 'px !important'
                });
            });
            scope.$on('eh:collapse-' + listenTo, function (event, args) {
                var targetHeight = args === 0 ? height : height - shrink;
                element.css({
                    height: targetHeight + 'px',
                    'min-height': targetHeight + 'px'
                });
            });
        }
    }

})();