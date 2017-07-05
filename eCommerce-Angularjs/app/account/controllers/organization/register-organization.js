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
                    // console.log(response);
                    if (!!response) {
                        localStorage.setSessionStorage();
                        var data = {
                            grant_type: 'password',
                            username: vm.email,
                            password: vm.password
                        };

                        authService.login(data).then(function (user) {
                            console.log(user);
                            if (!!user)
                                $state.go('organization.master.beneficiary');
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
            // Set the Title of Page Related to Current Location or Tab. According to VSO Bug-(816).
            document.title = $state.current.title;
            window.setTimeout(function () {
                // Setup validation
                // ------------------------------

                // Initialize
                var validator = $(".form-validate-jquery").validate({
                    ignore: 'input[type=hidden], .select2-search__field', // ignore hidden fields
                    errorClass: 'validation-error-label',
                    successClass: 'validation-valid-label',
                    highlight: function (element, errorClass) {
                        $(element).removeClass(errorClass);
                    },
                    unhighlight: function (element, errorClass) {
                        $(element).removeClass(errorClass);
                    },

                    // Different components require proper error label placement
                    errorPlacement: function (error, element) {
                        // Styled checkboxes, radios, bootstrap switch
                        if (element.parents('div').hasClass("checker") || element.parents('div').hasClass("choice") || element.parent().hasClass('bootstrap-switch-container')) {
                            if (element.parents('label').hasClass('checkbox-inline') || element.parents('label').hasClass('radio-inline')) {
                                error.appendTo(element.parent().parent().parent().parent());
                            }
                            else {
                                error.appendTo(element.parent().parent().parent().parent().parent());
                            }
                        }

                            // Unstyled checkboxes, radios
                        else if (element.parents('div').hasClass('checkbox') || element.parents('div').hasClass('radio')) {
                            error.appendTo(element.parent().parent().parent());
                        }

                            // Input with icons and Select2
                        else if (element.parents('div').hasClass('has-feedback') || element.hasClass('select2-hidden-accessible')) {
                            error.appendTo(element.parent());
                        }

                            // Inline checkboxes, radios
                        else if (element.parents('label').hasClass('checkbox-inline') || element.parents('label').hasClass('radio-inline')) {
                            error.appendTo(element.parent().parent());
                        }

                            // Input group, styled file input
                        else if (element.parent().hasClass('uploader') || element.parents().hasClass('input-group')) {
                            error.appendTo(element.parent().parent());
                        }

                        else {
                            error.insertAfter(element);
                        }
                    },
                    validClass: "validation-valid-label",
                    success: function (label) {
                        label.remove();
                        //label.removeClass("validation-error-label");
                        //label.removeClass("validation-valid-label").text();
                        // label.addClass("validation-valid-label").text("Success.");
                        // $("#email-error").hide();
                        // $("#pwd-error").hide();

                    },
                    rules: {
                        password: {
                            minlength: 5
                        },
                        repeat_password: {
                            equalTo: "#password"
                        },
                        email: {
                            email: true
                        },
                        repeat_email: {
                            equalTo: "#email"
                        },
                        minimum_characters: {
                            minlength: 10
                        },
                        maximum_characters: {
                            maxlength: 10
                        },
                        minimum_number: {
                            min: 10
                        },
                        maximum_number: {
                            max: 10
                        },
                        number_range: {
                            range: [10, 20]
                        },
                        url: {
                            url: true
                        },
                        date: {
                            date: true
                        },
                        date_iso: {
                            dateISO: true
                        },
                        numbers: {
                            number: true
                        },
                        digits: {
                            digits: true
                        },
                        creditcard: {
                            creditcard: true
                        },
                        basic_checkbox: {
                            minlength: 2
                        },
                        styled_checkbox: {
                            minlength: 2
                        },
                        switchery_group: {
                            minlength: 2
                        },
                        switch_group: {
                            minlength: 2
                        }
                    },
                    messages: {
                        custom: {
                            required: "This is a custom error message",
                        },
                        agree: "Please accept our policy"
                    }
                });


            }, 1000);

        }

        activate();
    }
})();
