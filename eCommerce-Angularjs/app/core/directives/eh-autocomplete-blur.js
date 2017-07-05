(function() {
    'use strict';

    angular
        .module('app.core')
        .directive('ehAutocompleteBlur', eh_autocomplete_blur);

    eh_autocomplete_blur.$inject = ['$timeout'];
    
    function eh_autocomplete_blur($timeout) {
        // Usage:
        //     <eh_autocomplete_blur></eh_autocomplete_blur>
        // Creates:
        // 
        var directive = {
            link: link,
            restrict: 'A'
        };
        return directive;

        function link(scope, element, attrs) {
            $timeout(function () {
                scope.textBoxElement = angular.element(element[0].children[0].children[0]);
            }, 100);
        }
    }

})();