(function () {
    'use strict';
    angular
        .module('app.account')
        .controller('RegisterOrganization', registerOrganization);

    registerOrganization.$inject = ['organizationAccountService', 'authService', '$state', 'localStorage', '$q', '$http', '$location'];

    function registerOrganization(organizationAccountService, authService, $state, localStorage, $q, $http, $location) {

        var protocol = $location.protocol();
        var host = $location.host();
        var port = $location.port();
        var serviceBase = protocol + '://' + host + ':' + port + '/webapi/';

        /* jshint validthis:true */
        var vm = this;
        vm.organizationName = '';
        vm.firstName = '';
        vm.lastName = '';
        vm.email = '';
        vm.password = '';
        vm.loading = false;
        vm.checked = false;
        vm.register = registerUser;
        $('.register').addClass('active');
        $('.login').removeClass('active');
        $('body').addClass('login-container login-cover');
        $('body').removeClass('navbar-top sidebar-xs sidebar-secondary-hidden pace-running ng-scope');

        function registerUser() {
            if (!!vm.checked) {
                vm.loading = true;
                var regData = {
                    "organizationName": vm.organizationName,
                    "firstName": vm.firstName,
                    "lastName": vm.lastName,
                    "email": vm.email,
                    "password": vm.password
                };
                organizationAccountService.register(regData).then(function (response) {
                    if (!!response) {
                        localStorage.setSessionStorage();
                        var data = {
                            grant_type: 'password',
                            username: vm.email,
                            password: vm.password
                        };

                        authService.login(data).then(function (user) {
                            if (!!user)
                                $state.go('dashboard or any home page path');
                            vm.loading = false;
                        }, function () {
                            vm.loading = false;
                        });
                    } else {
                        vm.loading = false;
                    }
                }, function (err) {
                    vm.loading = false;
                });
            }
        }
        
        function activate() {
            // Set the Title of Page
            document.title = $state.current.title;
        }

        activate();
    }
})();
