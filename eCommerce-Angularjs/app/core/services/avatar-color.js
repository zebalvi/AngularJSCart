(function () {
    'use strict';

    angular
        .module('app.core')
        .factory('avatarColor', avatar_color);

    avatar_color.$inject = ['$http'];

    function avatar_color($http) {
        var service = {
            getAvatarColor: getAvatarColor,
            getOrgChartColor: getOrgChartColor
        };

        var i = 0;

        return service;

        function getAvatarColor(charStr) {
            var color = '#000000';
            var colorArry = [
                '#F44336',
                '#E91E63',
                '#9C27B0',
                '#673AB7',
                '#3F51B5',
                '#2196F3',
                '#03A9F4',
                '#00BCD4',
                '#009688',
                '#4CAF50',
                '#8BC34A',
                '#CDDC39',
                '#FFEB3B',
                '#F9CE1D',
                '#FF9800',
                '#FF5722',
                '#9E9E9E',
                '#607D8B',
                '#795548',
                '#000000'
            ];
            var charStr_ascii = charStr.charCodeAt(0);
            var color = colorArry[charStr_ascii % 19];
            return color;
        }
        
        
        function getOrgChartColor(charStr) {
            var color = '#000000';
            var colorArry = [
            '#F44336',
            '#E91E63',
            '#9C27B0',
            '#673AB7',
            '#3F51B5',
            '#2196F3',
            '#03A9F4',
            '#00BCD4',
            '#009688',
            '#4CAF50',
            '#8BC34A',
            '#CDDC39',
            '#FFEB3B',
            '#F9CE1D',
            '#FF9800',
            '#FF5722',
            '#9E9E9E',
            '#607D8B',
            '#795548',
            '#000000'
            ];
            
            if (i == 14) {
                i = 0;
            }
            var color = colorArry[i++ % 25];
            return color;
            
        }
    }
})();