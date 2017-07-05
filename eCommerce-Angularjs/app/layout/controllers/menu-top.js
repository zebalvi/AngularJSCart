(function () {
    'use strict';

    angular
        .module('app.layout')
        .controller('MenuTop', menuTop);

    menuTop.$inject = ['menuTopService', '$state', '$scope', '$stateParams', '$timeout', 'localStorage'];

    function menuTop(menuTopService, $state, $scope, $stateParams, $timeout, localStorage) {
        /* jshint validthis:true */
        var vm = this;

        vm.logOut = function () {
            if (menuTopService.logOut()) {
                localStorage.removeObject('auth');
                $state.go('login');
            }
        }

        function activate() {
            // $state.current.name == 'organization.master.expectation';
        }

        activate();
    }
})();
