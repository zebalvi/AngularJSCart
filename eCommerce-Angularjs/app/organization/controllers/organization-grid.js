(function () {
    'use strict';

    angular
        .module('app.organization')
        .controller('OrganizationExpectation', organizationExpectation);

    organizationExpectation.$inject = [
        'organizationService',
        '$q',
        '$log',
        '$window',
        '$scope',
        '$state'
    ];

    function organizationExpectation(
        organizationService,
        $q,
        $log,
        $window,
        $scope,
        $state
        ) {
        var vm = this;

        function activate() {
            // Restart Pace Page Loader on Ajax Request
            Pace.restart();
            // Set the Title of Page Related to Current Location or Tab. According to VSO Bug-(816).
            document.title = $state.current.title;
        }

        activate();

    }
})();