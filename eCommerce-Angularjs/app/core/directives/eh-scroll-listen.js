(function () {
    'use strict';

    angular
        .module('app.core')
        .directive('ehScrollListen', eh_scroll_listen);

    eh_scroll_listen.$inject = ['$rootScope'];

    function eh_scroll_listen($rootScope) {
        // Usage:
        //     <eh_scroll_listen></eh_scroll_listen>
        // Creates:
        // 
        var directive = {
            link: link,
            restrict: 'A'
        };
        return directive;

        function link(scope, element, attrs) {
            if (!!attrs['target']) {
                var target = attrs['target'];
                element.bind('scroll', function () {
                    if (this.scrollTop <= 0) {
                        $rootScope.$broadcast('eh:shrink-' + target, 0);
                        $rootScope.$broadcast('eh:collapse-' + target, 0);
                    }
                    else if (this.scrollTop > 0 && this.scrollTop <= 150) {
                        $rootScope.$broadcast('eh:shrink-' + target, this.scrollTop / 5);
                    } else if (this.scrollTop > 150) {
                        $rootScope.$broadcast('eh:collapse-' + target, this.scrollTop);
                    }
                });
            }
        }
    }
})();