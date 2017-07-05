(function () {
    'use strict';

    angular.module('app')
    .config(config);

    config.$inject = ['$stateProvider', '$locationProvider', '$urlRouterProvider'];
    function config($stateProvider, $locationProvider, $urlRouterProvider) {

        $stateProvider
            .state('login', {
                url: '/login',
                templateUrl: 'app/auth/views/login.html',
                controllerAs: 'vm',
                controller: 'Login',
                title: 'Login'
            })
            .state('register', {
                url: '/organization/register',
                templateUrl: 'app/account/views/organization/register-organization.html',
                controllerAs: 'vm',
                controller: 'RegisterOrganization',
                title: 'Register'
            })
            .state('reset-password', {
                url: '/account/reset',
                templateUrl: 'app/account/views/organization/reset-password.html',
                controllerAs: 'vm',
                controller: 'ResetPassword',
                title: 'Reset Password'
            })

            //******************** for shopping cart workflow
            .state('organization', {
                url: '/organization',
                templateUrl: 'app/layout/views/master.html',
                controllerAs: 'vm',
                controller: 'Master'//, abstract: true
            })
            .state('organization.master', {
                url: '/master',
                views: {
                    'menutop': {
                        templateUrl: 'app/layout/views/menu-top.html',
                        controllerAs: 'vm',
                        controller: 'MenuTop'
                    },
                    'master': {
                        templateUrl: 'app/organization/views/organization-master.html',
                        controllerAs: 'vm',
                        controller: 'OrganizationMaster'//, abstract: true
                    }
                }
            })
            .state('organization.master.list', {
                url: '/list',
                title: 'Organization List View',
                views: {
                    'datalist': {
                        templateUrl: 'app/organization/views/list/list.html',
                        controllerAs: 'vm',
                        controller: 'OrganizationStoreList'
                    }
                }
            })
            .state('organization.master.grid', {
                url: '/grid',
                title: 'Organization Grid View',
                views: {
                    'datalist': {
                        templateUrl: 'app/organization/views/grid/grid.html',
                        controllerAs: 'vm',
                        controller: 'OrganizationExpectation'
                    }
                },

            })
            .state('organization.master.cart', {
                url: '/cart',
                title: 'Organization Cart',
                views: {
                    'datalist': {
                        templateUrl: 'app/organization/views/cart/cart.html',
                        controllerAs: 'vm',
                        controller: 'OrganizationCart'
                    }
                },

            });

        $urlRouterProvider
        .otherwise('/login');

        $locationProvider
            .html5Mode(false);
    }
})();