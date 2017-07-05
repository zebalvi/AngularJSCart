(function () {
    'use strict';

    angular
        .module('app.layout')
        .factory('menuTopService', MenuTopService);

    MenuTopService.$inject = ['$http', '$q', 'logger', '$rootScope', '$timeout', '$location'];

    function MenuTopService($http, $q, logger, $rootScope, $timeout, $location) {
        var host = $location.host();
        var protocol = $location.protocol();
        var port = $location.port();
        var serviceBase = protocol + '://' + host + ':' + port + '/WebApi/';

        var service = {
            logOut: logOut,
        };

        return service;

        function logOut(data) {
            logger.error('Logged Out.', 'success', 'topRight');
            return true;
        }

    }
})();