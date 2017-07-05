(function () {
    'use strict';

    angular
        .module('app.account')
        .factory('organizationAccountService', organization);

    organization.$inject = ['$http', 'logger', '$q', '$location'];

    function organization($http, logger, $q, $location) {
        var service = {
            register: register,
            resetPassword: resetPassword,
            resetPasswordValue: resetPasswordValue
        };
        var host = $location.host();
        var protocol = $location.protocol();
        var port = $location.port();
        var serviceBase = protocol + '://' + host + ':' + port + '/webapi/';

        return service;

        function register(data) {
            var abortPromis = $q.defer();
            var request = $http
                .post(serviceBase + 'api/account/RegisterAccount', data, { headers: { 'Content-Type': 'application/json' }, timeout: abortPromis.promise });

            var deferred = request.then(function (response) {
                if (response.status === 200) {
                    return true;
                } else {
                    $q.reject('No data found');
                }
            }, function (response) {
                logger.error(response.data, 'error', 'top');
                $q.reject('an error occur while accessing the server');
            });
            deferred.abort = function () {
                abortPromis.resolve();
            };
            deferred.finally(
                        function () {
                            deferred.abort = angular.noop;
                            abortPromis = request = deferred = null;
                        }
                    );

            return deferred;

        }

        function resetPassword(data) {
            var abortPromis = $q.defer();
            var request = $http
                .post(serviceBase + 'api/account/ResetPassword', data, { headers: { 'Content-Type': 'application/json' }, timeout: abortPromis.promise });

            var deferred = request.then(function (response) {
                if (response.status === 200) {
                    return true;
                } else {
                    $q.reject('No data found');
                }
            }, function (response) {
                logger.error('Demo functionality.', 'alert', 'topRight');
                $q.reject('an error occur while accessing the server');
            });
            deferred.abort = function () {
                abortPromis.resolve();
            };
            deferred.finally(
                        function () {
                            deferred.abort = angular.noop;
                            abortPromis = request = deferred = null;
                        }
                    );

            return deferred;

        }

        function resetPasswordValue(data) {
            var abortPromis = $q.defer();
            var request = $http
                .post(serviceBase + 'api/account/ResetPasswordValue', data, { headers: { 'Content-Type': 'application/json' }, timeout: abortPromis.promise });

            var deferred = request.then(function (response) {
                if (response.status === 200) {
                    return true;
                } else {
                    $q.reject('No data found');
                }
            }, function (response) {
                logger.error("Demo functionality", 'information', 'top');
                $q.reject('an error occur while accessing the server');
            });
            deferred.abort = function () {
                abortPromis.resolve();
            };
            deferred.finally(
                        function () {
                            deferred.abort = angular.noop;
                            abortPromis = request = deferred = null;
                        }
                    );

            return deferred;

        }
    }
})();