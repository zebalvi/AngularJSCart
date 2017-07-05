(function () {
    'use strict';

    angular
        .module('app.organization')
        .controller('OrganizationStoreList', organizationStoreList)
        .filter('startFrom', function () {
            //We already have a limitTo filter built-in to angular,
            //let's make a startFrom filter
            return function (input, start) {
                start = +start; //parse to int
                return input.slice(start);
            }
        });

    organizationStoreList.$inject = [
        'organizationService',
        '$q',
        '$log',
        '$window',
        '$scope',
        '$state',
        '$stateParams'
    ];

    function organizationStoreList(
        organizationService,
        $q,
        $log,
        $window,
        $scope,
        $state,
        $stateParams
        ) {
        var vm = this;


        // Loading the Items List...
        vm.items = [
            new item("1", "Fathom Backpack", "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit.", 12, "Content/assets/images/products/1.jpeg", 10.99),
            new item("2", "Mystery Air Long Sleeve T Shirt", "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit.", 16, "Content/assets/images/products/2.jpeg", 65.99),
            new item("3", "Women’s Prospect Backpack", "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit.", 4, "Content/assets/images/products/3.jpeg", 73.99),
            new item("4", "Overlook Short Sleeve T Shirt", "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit.", 3, "Content/assets/images/products/4.jpeg", 44.99),
            new item("5", "Infinite Ride Liner", "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit.", 10, "Content/assets/images/products/5.jpeg", 88.99),
            new item("6", "Custom Snowboard", "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit.", 11, "Content/assets/images/products/6.jpeg", 99.99),
            new item("7", "Lunch Sack' Day Hiker 20L Backpack", "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit.", 8, "Content/assets/images/products/7.jpeg", 44.99),
            new item("8", "Cambridge Jacket", "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit.", 8, "Content/assets/images/products/8.jpeg", 32.99),
            new item("9", "Day Hiker Pinnacle 31L Backpack", "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit.", 14, "Content/assets/images/products/9.jpeg", 66.99),
            new item("10", "Kids' Gromlet Backpack", "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit.", 18, "Content/assets/images/products/10.jpeg", 84.99),
            new item("1", "Tinder Backpack", "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit.", 8, "Content/assets/images/products/11.jpeg", 33.75),
            new item("12", "Almighty Snowboard Boot", "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit.", 9, "Content/assets/images/products/12.jpeg", 21.50),

        ];

        // Restart Pace Page Loader on Ajax Request
        Pace.restart();
        // Set the Title of Page Related to Current Location or Tab. According to VSO Bug-(816).
        document.title = $state.current.title;

        // get store and cart from service
        // $scope.store = organizationService.store;
        $scope.cart = organizationService.cart;

        // partially working pagination for demonstraion purposes only
        $scope.currentPage = 0;
        $scope.pageSize = 5; // get the lingth of pagination from products
        $scope.data = [];
        $scope.numberOfPages = function () {
            return Math.ceil(vm.items.length / $scope.pageSize); // $scope.data.length / $scope.pageSize
        }
        for (var i = 0; i < 45; i++) {
            $scope.data.push("Item " + i);
        }

        // apply changes when cart items change
        $scope.cart.itemsChanged = function (e) {
            if (!$scope.$$phase) {
                $scope.$apply();
            }
        }

        // use routing to pick the selected product
        if ($stateParams.productSku != null) {
            $scope.product = $scope.store.getProduct($stateParams.productSku);
        }


    }
})();