(function () {
    'use strict';

    angular.module('app')
        .run(run);


    run.$inject = ['$rootScope', 'authService', 'localStorage'];

    function run($rootScope, authService, localStorage) {
        localStorage.setSessionStorage();

        localStorage.getObject('auth').then(function (authData) {
        }, function () {
            localStorage.setLocalStorage();
        });

        $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
            localStorage.getObject('auth').then(function (authData) {
                if (!!authData.token.expiry) {
                    var checkpoint = new Date();
                    var expiry = new Date(authData.token.expiry);
                    var msDay = 60 * 60 * 24 * 1000;
                    if ((Math.floor((expiry - checkpoint) / msDay) <= 1))
                        authService.refreshToken().then(function () { }, function () { });
                }
            });
        });
    }
})();