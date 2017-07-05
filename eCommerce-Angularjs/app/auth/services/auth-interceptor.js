(function () {
    'use strict';

    angular
        .module('app.auth')
        .factory('authInterceptorService', auth_interceptor);

    auth_interceptor.$inject = ['$q', 'localStorage', '$location'];

    function auth_interceptor($q, localStorage, $location) {
        var service = {
            request: request,
            responseError: responseError
        };
        if (typeof String.prototype.endsWith !== 'function') {
            String.prototype.endsWith = function (suffix) {
                return this.indexOf(suffix, this.length - suffix.length) !== -1;
            };
        }

        return service;

        function request(config) {
            var deferred = $q.defer();
            config.headers = config.headers || {};
            localStorage.getObject('auth').then(function (authData) {
                if (!!authData
                    && !!authData.token
                    && (!config.url.endsWith('html')
                    && !config.url.endsWith('js')
                    && !config.url.endsWith('map')
                    && !config.url.endsWith('svg')
                    && !config.url.endsWith('css')
                    && !config.url.endsWith('png')
                    && !config.url.endsWith('jpg')
                    && !config.url.endsWith('ico')
                    && !config.url.endsWith('appcache'))) {
                    config.headers.Authorization = 'Bearer ' + authData.token.accessToken;
                    config.headers.RefreshToken = authData.token.refreshToken;
                    deferred.resolve(config);
                } else {
                    deferred.resolve(config);
                }
            }, function (reason) {
                deferred.resolve(config);
            });
            return deferred.promise;
        }

        function responseError(rejection) {
            if (rejection.status === 401) {
                $location.path('/login/access-denied');
            }
            return $q.reject(rejection);
        }
    }
})();