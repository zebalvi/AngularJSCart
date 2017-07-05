(function () {
    'use strict';

    angular
        .module('app.core')
        .factory('endOfMonth', end_Of_Month);

    end_Of_Month.$inject = ['$http'];

    function end_Of_Month($http) {
        var service = {
            getEndOfMonth: getEndOfMonth
        };

        return service;

        function getEndOfMonth() {
            var date = new Date();
            var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
            var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);

            var lastDayWithSlashes = lastDay.getFullYear() + "-" + (lastDay.getMonth() + 1).toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false }) + "-" + (lastDay.getDate());

            return new Date(lastDayWithSlashes);
        }
    }
})();