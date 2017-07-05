(function () {
    'use strict';

    angular
        .module('app.core')
        .controller('Toast', toast);

    toast.$inject = ['$mdToast'];

    function toast($mdToast) {
        /* jshint validthis:true */
        var vm = this;
        vm.closeToast = closeToast;

        function closeToast() {
            $mdToast.hide({ close: true });
        }
    }
})();
