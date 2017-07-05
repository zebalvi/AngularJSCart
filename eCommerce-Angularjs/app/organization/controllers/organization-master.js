(function () {
    'use strict';

    angular
        .module('app')
        .controller('OrganizationMaster', organizationMaster);

    organizationMaster.$inject = ['localStorage', 'organizationService', '$window', '$q', '$scope', '$state', '$timeout', '$interval'];

    function organizationMaster(localStorage, organizationService, $window, $q, $scope, $state, $timeout) {
        /* jshint validthis:true */
        var vm = this;
                        
        function activate() {

        }

        activate();

    }
})();
