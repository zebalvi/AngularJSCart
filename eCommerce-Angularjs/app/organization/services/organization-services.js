(function () {
    'use strict';

    angular
        .module('app.organization')
        .factory('organizationService', OrganizationService);

    OrganizationService.$inject = ['$http', '$q', 'logger', '$rootScope', '$timeout', '$location'];

    function OrganizationService($http, $q, logger, $rootScope, $timeout, $location) {
        var host = $location.host();
        var protocol = $location.protocol();
        var port = $location.port();
        var serviceBase = protocol + '://' + host + ':' + port + '/WebApi/';

        var service = {
            /*
                Declare service methonds here
                e.g. (getData : getData), etc.
            */
        };

        /* 
            any logic here containing AJAX requests
        */


        // create shopping cart
        var myCart = new shoppingCart("app");
        
        // return data object with cart
        return service = {
            cart: myCart
        };     
    }
})();