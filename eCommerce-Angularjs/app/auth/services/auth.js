(function () {
    'use strict';

    angular
        .module('app.auth')
        .factory('authService', auth_service);

    auth_service.$inject = ['$http', 'logger', 'localStorage', '$q', '$location', '$rootScope', 'avatarInitials'];

    function auth_service($http, logger, localStorage, $q, $location, $rootScope, avatarInitials) {
        var protocol = $location.protocol();
        var host = $location.host();
        var port = $location.port();
        var serviceBase = protocol + '://' + host + ':' + port + '/webapi/';

        var user = undefined;
        var label = undefined;

        var service = {
            login: login,
            logout: logout,
            refreshToken: refreshToken,
        };

        return service;

        function refreshToken() {
            return localStorage.getObject('auth').then(
                   function (authData) {
                       if (!!authData && !!authData.token.refreshToken) {
                           var data = 'grant_type=refresh_token&refresh_token=' + encodeURIComponent(authData.token.refreshToken) + '&client_id=web';
                           var abortPromis = $q.defer();
                           var request = $http
                               .post(serviceBase + 'token', data, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, timeout: abortPromis.promise });

                           var deferred = request.then(function (response) {
                               if (!!response.data) {
                                   getAvatar().then(function (avatar) {
                                       if (!!avatar) {
                                           if (avatar.length > 0) {
                                               var result = {
                                                   token: {
                                                       accessToken: response.data.access_token,
                                                       expiry: new Date(response.data['.expires']),
                                                       refreshToken: response.data.refresh_token
                                                   },
                                                   user: {
                                                       firstName: response.data.firstName,
                                                       lastName: response.data.lastName,
                                                       email: response.data.email,
                                                       userId: response.data.userId,
                                                       avatar: avatar
                                                   }
                                               };
                                               localStorage.storeObject('auth', result).then(function () {
                                                   user = angular.copy(result.user);
                                                   userUpdated();
                                               });
                                               return result.user;
                                           }
                                       } else {
                                           var result = {
                                               token: {
                                                   accessToken: response.data.access_token,
                                                   expiry: new Date(response.data['.expires']),
                                                   refreshToken: response.data.refresh_token
                                               },
                                               user: {
                                                   firstName: response.data.firstName,
                                                   lastName: response.data.lastName,
                                                   email: response.data.email,
                                                   userId: response.data.userId,
                                                   avatar: avatarInitials.getAvatarDataUrl(response.data.firstName + ' ' + response.data.lastName, '#ffffff', '#013F70')
                                               }
                                           };
                                           localStorage.storeObject('auth', result).then(function () {
                                               user = angular.copy(result.user);
                                               userUpdated();
                                           });
                                           return result.user;
                                       }
                                   }, function () {
                                       //vm.loading = false;
                                   });
                               } else {
                                   resetUser();
                                   $location.path('/login/access-denied');
                                   $q.reject('not avalid response');
                               }
                           }, function (err) {
                               resetUser();
                               if (err.status !== 0 && err.status !== 500) { // request is aborted.
                                   logger.error(err.data.error, 'error', 'top');
                               }
                               if (err.status !== 0) {
                                   $location.path('/login/access-denied');
                                   $q.reject('an error occur while accessing the server');
                               }
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
                   }, function () {
                       $q.reject('not found');
                   });
        }

        function login(loginData) {
            var data = 'grant_type=password&username=' + encodeURIComponent(loginData.username) + '&password=' + encodeURIComponent(loginData.password) + '&client_id=web';
            var abortPromis = $q.defer();
            var request = $http
                .post(serviceBase + 'token', data, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, timeout: abortPromis.promise });
            var deferred = request.then(function (response) {
                if (!!response.data) {
                    var result = {
                        token: {
                            accessToken: response.data.access_token,
                            expiry: new Date(response.data['.expires']),
                            refreshToken: response.data.refresh_token
                        },
                        user: {
                            firstName: response.data.firstName,
                            lastName: response.data.lastName,
                            email: response.data.email,
                            userId: response.data.userId,
                            avatar: avatarInitials.getAvatarDataUrl(response.data.firstName + ' ' + response.data.lastName, '#ffffff', '#013F70')
                        }
                    };
                    localStorage.storeObject('auth', result).then(function () {
                        user = angular.copy(result.user);
                        userUpdated();
                    });
                    return result.user;
                } else {
                    resetUser();
                    logger.error('No valid response from Server' + ' ' + response, 'error', 'topRight');
                    $q.reject('not avalid response');
                }
            }, function (err) {
                logger.error('Login succeeded', 'success', 'topRight');

                // only for dummy login implementation
                var result = {
                    token: {
                        accessToken: "N03YkzKKGbHJZtK1qyBCWTzDSXh6JzGQ7LSG2obfrWrI7w2gQWKexc_D80xzhFuaKnQOYw-OGOBD59iSLz1SE2Nq5WjtmpPCB1OTkPbwI1LnGXw3ZYN7RzqfgdlCoXVdRzzp6C9pnyLnN0W7wNYiiCBuN-eD_bmcHSXdEIT_UP_79EGuY0wr4oBx7cTQKbh3qSprpoCJeaNL86279W7eIzcBbs1P5RHvl-LnCwK-I73aoJTs_YVJ9qyqWGf0rmcATcy6dKqlQWZkr81zrTRZ7Ex4U7UercSWChRP2dsmOTG6WozgbGr1CsOrVfbnoitYbsXHY12Tx9qdLcjD1dOxhTlRs-oARNsxObIyED76NrPK3ctGp6ISYiqgcub9YvEIC4GgFHh-c7wtQWxf3H_9pwC_LfIfRLu_XPy_z4uD79L7RXulFjDBv4OyoPK9A8z653Cq3b_zNxD926Vs1Jq40djypVxx0AMf_meriXHTjgdBClYDQ2wi-1k1Gm34zGWyq3SZWGzTBZDfPGa0W0KV_W4iUMScsbHTw4vOSqLV62ST4OmojhdpzPRmTAUMKdDZxMar7POcKcw6_fRGSlv8Nd3bf-mvNoofSVGR27MBdslp3GqukERNWhyBCazZwxZp",
                        expiry: "Sat Jul 08 2017 07:09:40 GMT+0500 (Pakistan Standard Time)", // new Date(response.data['.expires']), // Sat Jul 08 2017 07:09:40 GMT+0500 (Pakistan Standard Time)
                        refreshToken: "9a6400008f270c5bc23508d4c1b89244"
                    },
                    user: {
                        firstName: "Guest",
                        lastName: "Guest",
                        email: "guest@example.com",
                        userId: "001",
                        avatar: avatarInitials.getAvatarDataUrl("Jahan" + ' ' + "Zeb", '#ffffff', '#013F70')
                    }
                };
                localStorage.storeObject('auth', result).then(function () {
                    user = angular.copy(result.user);
                    userUpdated();
                    // logger.log('user ' + result.user.email + ' logged in successfully');
                });
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
        
        function logout() {
            var abortPromis = $q.defer();
            var request = $http
                .post(serviceBase + 'api/account/logout', {}, { headers: { 'Content-Type': 'application/json' }, timeout: abortPromis.promise });

            var deferred = request.then(function (response) {
                resetUser();
                return;
            }, function (err) {
                resetUser();
                if (err.status !== 0 && err.status !== 500) { // request is aborted.
                    var message = err.data.errors.map(function (error) {
                        return error.errorCode.code + ': ' + error.errorMessage;
                    }).join('<br>');
                    logger.error(message + ' ' + err.data, 'error', 'topRight');
                } else if (err.status === 500) {
                    logger.error('An Error occur in the Server' + ' ' + err.data, 'error', 'topRight');
                } $q.reject('an error occur while accessing the server');
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

        function resetUser() {
            user = undefined;
            localStorage.removeObject('auth').then(function () {
                userUpdated();
            });
        }

        function userUpdated() {
            $rootScope.$broadcast('auth:userUpdated', user);
        }
    }
})();