(function () {
    'use strict';

    angular
        .module('app.account')
        .controller('ResetPasswordForm', resetPasswordForm);

    resetPasswordForm.$inject = ['organizationAccountService', 'employee', 'authService', '$state', 'localStorage'];

    function resetPasswordForm(organizationAccountService, employee, authService, $state, localStorage) {
        var vm = this;
        $('body').addClass('login-container login-cover');
        vm.reset = reset;
        vm.user = employee;

        function reset() {
            var data = { Email: vm.user.UserEmailAddress, Password: vm.user.Password }
            organizationAccountService.resetPasswordValue(data).then(function (success) {
                if (success) {
                    localStorage.setSessionStorage();
                    var data = {
                        grant_type: 'password',
                        username: vm.user.UserEmailAddress,
                        password: vm.user.Password
                    };
                    authService.login(data).then(function (user) {
                        if (!!user)                  
                            $state.go('login');    
                    });
                }
            }, function (err) {
                // vm.loading = false;
            });
        }

        function resetPassword() {            
            var data = { Email: vm.user.UserEmailAddress }
            organizationAccountService.resetPassword(data).then(function (success) {
                if (success) {
                }
            }, function (err) {
            });
        }
        activate();

        function activate() {
            // Set the Title of Page Related to Current Location or Tab. According to VSO Bug-(816).
            document.title = $state.current.title;
        }
    }
})();
