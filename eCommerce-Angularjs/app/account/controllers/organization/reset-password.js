(function () {
    'use strict';

    angular
        .module('app.account')
        .controller('ResetPassword', resetPassword);

    resetPassword.$inject = ['organizationAccountService', 'authService', '$state', 'localStorage', '$q', '$http', '$location'];

    function resetPassword(organizationAccountService, authService, $state, localStorage, $q, $http, $location) {

        var protocol = $location.protocol();
        var host = $location.host();
        var port = $location.port();
        var serviceBase = protocol + '://' + host + ':' + port + '/webapi/';

        /* jshint validthis:true */
        var vm = this;
        vm.showMessage = false;
        vm.Email = '';
        vm.loading = false;
        vm.resetPassword = resetPassword;
        $('body').addClass('login-container login-cover');
        $('body').removeClass('navbar-top sidebar-xs sidebar-secondary-hidden pace-running ng-scope');
        vm.resetForm = function () {
            vm.showMessage = false;
            vm.loading = false;
        }
        function resetPassword() {
            var data = { Email: vm.Email }
            organizationAccountService.resetPassword(data).then(function (success) {
                if (success) {
                } else {
                }              
            }, function (err) {
            });
        }
        
        function activate() {
            // Set the Title of Page Related to Current Location or Tab. According to VSO Bug-(816).
            document.title = $state.current.title;
        }

        activate();
    }
})();
