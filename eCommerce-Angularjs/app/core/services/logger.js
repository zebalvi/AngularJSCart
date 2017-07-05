(function () {
    'use strict';

    angular
        .module('app.core')
        .factory('logger', logger);

    logger.$inject = ['$log'];

    function logger($log) {
        var service = {
            log: log,
            error: error
        };
        
        var notes = [];
        // Text options
        notes['alert'] = 'Best check yo self, you\'re not looking too good.';
        notes['error'] = 'Change a few things up and try submitting again.';
        notes['success'] = 'You successfully read this important alert message.';
        notes['information'] = 'This alert needs your attention, but it\'s not super important.';
        notes['warning'] = 'Warning! Best check yo self, you\'re not looking too good.';
        notes['confirm'] = 'Do you want to continue?';

        return service;

        /* this functions needs 3 params, e.g. (message, notificationType, Position)
        * message : any custom message according to needs,
        * notificationType: success, error, info, etc.,
        * Position: top, bottom, etc.
        */
        function log(message, type, layout) {
            notes['success'] = message;
            var self = $(this);
            noty({
                width: 200,
                text: notes['success'], // notes[self.data('type')],
                type: type, // self.data('type'),
                dismissQueue: true,
                timeout: 2000,
                layout: layout, // self.data('layout'),
                buttons: (self.data('type') != 'confirm') ? false : [
                    {
                        addClass: 'btn btn-primary btn-xs',
                        text: 'Ok',
                        onClick: function ($noty) { //this = button element, $noty = $noty element
                            $noty.close();
                            noty({
                                force: true,
                                text: 'You clicked "Ok" button',
                                type: 'success',
                                layout: self.data('layout')
                            });
                        }
                    },
                    {
                        addClass: 'btn btn-danger btn-xs',
                        text: 'Cancel',
                        onClick: function ($noty) {
                            $noty.close();
                            noty({
                                force: true,
                                text: 'You clicked "Cancel" button',
                                type: 'error',
                                layout: self.data('layout')
                            });
                        }
                    }
                ]
            });
            return false;
        }

        function error(message, type, layout) {
            notes['error'] = message;
            var self = $(this);
            noty({
                width: 200,
                text: notes['error'], // notes[self.data('type')],
                type: type, // self.data('type'),
                dismissQueue: true,
                timeout: 2000,
                layout: layout, // self.data('layout'),
                buttons: (self.data('type') != 'confirm') ? false : [
                    {
                        addClass: 'btn btn-primary btn-xs',
                        text: 'Ok',
                        onClick: function ($noty) { //this = button element, $noty = $noty element
                            $noty.close();
                            noty({
                                force: true,
                                text: 'You clicked "Ok" button',
                                type: 'success',
                                layout: self.data('layout')
                            });
                        }
                    },
                    {
                        addClass: 'btn btn-danger btn-xs',
                        text: 'Cancel',
                        onClick: function ($noty) {
                            $noty.close();
                            noty({
                                force: true,
                                text: 'You clicked "Cancel" button',
                                type: 'error',
                                layout: self.data('layout')
                            });
                        }
                    }
                ]
            });
            return false;
        }
    }
})();