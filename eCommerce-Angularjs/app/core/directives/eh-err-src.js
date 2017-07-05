(function() {
    'use strict';

    angular
        .module('app.core')
        .directive('ehErrSrc', eh_err_src);

    eh_err_src.$inject = ['avatarInitials'];
    
    function eh_err_src(avatarInitials) {
        // Usage:
        //     <eh_err_src></eh_err_src>
        // Creates:
        // 
        var directive = {
            link: link,
            restrict: 'A'
        };
        return directive;

        function link(scope, element, attrs) {
            var name = attrs.pcName;
            element.bind('error', function () {
                element.attr('src', avatarInitials.getAvatarDataUrl(name, '#EEEEEE', '#013F70'));
            });
        }
    }

})();