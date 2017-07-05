(function () {
    'use strict';
    angular
        .module('app.auth')
        .controller('Login', login);

    login.$inject = ['authService', '$state', '$stateParams', 'logger', 'localStorage', '$q', '$http', '$location', '$timeout', '$scope'];

    function login(authService, $state, $stateParams, logger, localStorage, $q, $http, $location, $timeout, $scope) {
        var protocol = $location.protocol();
        var host = $location.host();
        var port = $location.port();
        var serviceBase = protocol + '://' + host + ':' + port + '/webapi/';

        /* jshint validthis:true */
        var vm = this;
        vm.email = '';
        vm.password = '';
        vm.checked = false;

        vm.isLoggedIn = function () {
            return !!vm.user;
        }

        vm.user = undefined;

        $('.login').addClass('active');
        $('.register').removeClass('active');
        $('body').addClass('login-container login-cover');
        $('body').removeClass('navbar-top sidebar-xs sidebar-secondary-hidden pace-running ng-scope');
        vm.login = function () {
            if (!vm.checked)
                localStorage.setSessionStorage();
            else {
                localStorage.setLocalStorage();
            }
            var data = {
                grant_type: 'password',
                username: vm.email,
                password: vm.password
            };
            authService.login(data).then(function (user) {
                if (!!user) {
                    authService.getAvatar().then(function (avatar) {
                        if (!!avatar) {
                            if (avatar.length > 0) {
                                localStorage.getObject('auth').then(function (authData) {
                                    if (!!authData) {
                                        authData.user.avatar = avatar;
                                        localStorage.storeObject('auth', authData);
                                    } else {
                                        deferred.resolve(config);
                                    }
                                }, function (reason) {
                                    deferred.resolve(config);
                                });
                            }
                        }
                        $state.go('organization.master.list');
                    });
                    $state.go('organization.master.list');
                }
            }, function () {
                //vm.loading = false;              
            });
        }
        
        function activate() {
            // Set the Title of Page Related to Current Location or Tab. According to VSO Bug-(816).
            document.title = $state.current.title;
                        
            // END: Call Labels function...
            if (!!$stateParams.case) {
                logger.error('Access Denied');
            }
        }

        refreshUser();

        activate();

        $scope.$on('auth:userUpdated', function () {
            refreshUser();
        });

        function refreshUser() {
            $timeout(function () {
                localStorage.getObject('auth').then(function (authData) {
                    if (!!authData && !!authData.user) {
                        vm.user = angular.copy(authData.user);
                        if (vm.isLoggedIn) {
                            $state.go('organization.master.list');
                            $('body').removeClass('login-container login-cover');
                        }
                    } else {
                        vm.user = undefined;
                    }
                }, function () {
                    vm.user = undefined;
                });
            }, 100, true);
        }

    }
})();
