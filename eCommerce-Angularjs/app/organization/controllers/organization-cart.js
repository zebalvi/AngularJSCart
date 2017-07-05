(function () {
    'use strict';

    angular
        .module('app.organization')
        .controller('OrganizationCart', organizationCart);

    organizationCart.$inject = [
        'organizationService',
        '$q',
        '$log',
        '$window',
        '$scope',
        '$state',
        '$stateParams',
        'logger'
    ];

    function organizationCart(
        organizationService,
        $q,
        $log,
        $window,
        $scope,
        $state,
        $stateParams,
        logger
      ) {
        var vm = this;
        // Restart Pace Page Loader on Ajax Request
        Pace.restart();
        // Set the Title of Page Related to Current Location or Tab. According to VSO Bug-(816).
        document.title = $state.current.title;

        // get store and cart from service
        // $scope.store = organizationService.store;
        $scope.cart = organizationService.cart;

        vm.checkOut = function () {
            logger.log("This is Demo functionality", "information", "topRight")
        }

    }
})();