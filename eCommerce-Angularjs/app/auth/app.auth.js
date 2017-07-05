(function () {
    'use strict';

    angular.module('app.auth', ['app.core'])
        .config(['$httpProvider', config]);

    function config($httpProvider) {
        $httpProvider.interceptors.push('authInterceptorService');
    }
})();