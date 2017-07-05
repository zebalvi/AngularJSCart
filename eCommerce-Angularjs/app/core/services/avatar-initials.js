(function () {
    'use strict';

    angular
        .module('app.core')
        .factory('avatarInitials', avatar_initials);

    avatar_initials.$inject = ['$http'];

    function avatar_initials($http) {
        var service = {
            getAvatarDataUrl: getData
        };

        return service;

        function getData(name, color, textColor) {
            // !!defaultColor ? '#2196F3' : '#f07829'
            // !!defaultTextColor ? '#ffffff' : '#013F70'
            return new initialAvatar(name, {
                font: 'Roboto',
                size: 95,
                color: !!color ? color : '#000000',
                textColor: !!textColor ? textColor : '#ffffff'
            }).getData();
        }
    }
    /*************************************************************
 * This script is developed by Arturs Sosins aka ar2rsawseen, http://webcodingeasy.com
 * Feel free to distribute and modify code, but keep reference to its creator
 *
 * Initial Avatar class creates avatars for users from user initials.
 * It creates a hash from the user's name and generates a background color based on it.
 * Then it gets a complimentary color for the text, and calculates text size and position
 * based on the font and length of initials.
 * This package can output binary image data, or apply image to existing img element
 * or create new img element
 *
 * For more information, examples and online documentation visit: 
 * http://webcodingeasy.com/JS-classes/Create-avatar-from-user-initials
**************************************************************/
    var initialAvatar = function (name, config) {
        var conf = {
            font: 'Arial',
            size: 95,
            textColor: '#ffffff'
        };

        var canvas;
        var ctx;
        var ob = this;
        this.name = name;

        this.construct = function () {
            //copying configuration
            for (var opt in config) {
                if (config.hasOwnProperty(opt)) {
                    conf[opt] = config[opt];
                }
            }

            if (document.getElementById('ia_canvas')) {
                canvas = document.getElementById('ia_canvas');
                ctx = canvas.getContext('2d');
            }
            else {
                //create canvas for drawing
                canvas = document.createElement('canvas');
                canvas.style.position = 'absolute';
                canvas.style.top = '0px';
                canvas.style.left = '0px';
                canvas.style.display = 'none';
                canvas.id = 'ia_canvas';
                ctx = canvas.getContext('2d');
                document.body.appendChild(canvas);
            }
        };

        this.draw = function () {
            canvas.setAttribute('width', conf.size + 'px');
            canvas.setAttribute('height', conf.size + 'px');

            var color = conf.color;
            ctx.fillStyle = color;
            ctx.fillRect(0, 0, conf.size, conf.size);

            var arr = this.name.trim().split(' ');
            for (var i = 0, l = arr.length; i < l; i++) {
                arr[i] = arr[i].charAt(0);
            }

            ctx.fillStyle = conf.textColor;
            //ctx.font = (conf.size / arr.length) + 'px ' + conf.font;
            ctx.font = (35) + 'px ' + conf.font;
            ctx.textBaseline = 'middle';

            var str = arr.join('').toUpperCase();
            var dim = ctx.measureText(str);
            ctx.fillText(str, (conf.size - dim.width) / 2, conf.size / 2);
        };

        this.getData = function () {
            this.draw();
            return canvas.toDataURL();
        };

        this.applyToImage = function (id) {
            this.draw();
            var elem = (typeof id == 'string') ? document.getElementById(id) : id;
            elem.src = this.getData();
        };

        this.getImage = function () {
            this.draw();
            var elem = document.createElement('img');
            elem.src = this.getData();
            return elem;
        };
        this.construct();
    }
})();