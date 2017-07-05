(function () {
    'use strict';

    angular
        .module('app.core')
        .factory('localStorage', localStorage);

    localStorage.$inject = ['$localStorage', '$sessionStorage', '$q'];

    function localStorage($localStorage, $sessionStorage, $q) {
        var activeStorage = $localStorage;
        var service = {
            storeObject: storeObject,
            getObject: getObject,
            removeObject: removeObject,
            setLocalStorage: setLocalStorage,
            setSessionStorage: setSessionStorage
        };

        return service;
        function setLocalStorage() {
            activeStorage = $localStorage;
        }

        function setSessionStorage() {
            activeStorage = $sessionStorage;
        }

        function storeObject(key, obj) {
            var deferred = $q.defer();
            var value = JSON.stringify(obj);
            activeStorage.auth = value;
            deferred.resolve(true);
            return deferred.promise;
        }

        function getObject(key) {
            var deferred = $q.defer();
            var value = activeStorage.auth;
            if (!!value)
                deferred.resolve(JSON.parse(value));
            else {
                deferred.reject('not found');
            }
            return deferred.promise;
        }

        function removeObject(key) {
            var deferred = $q.defer();
            delete activeStorage.auth;
            deferred.resolve(true);
            return deferred.promise;
        }
    }
})();