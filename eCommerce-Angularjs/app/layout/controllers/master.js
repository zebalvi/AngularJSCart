(function () {
    'use strict';

    angular
        .module('app')
        .controller('Master', master);

    master.$inject = ['$scope', '$stateParams', '$state'];

    function master($scope, $stateParams, $state) {
        /* jshint validthis:true */
        var vm = this;      

        function activate() {
        }
        activate();
    }
})();
