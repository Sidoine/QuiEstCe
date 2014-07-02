﻿define(["require", "exports", 'jquery', 'knockout'], function(require, exports, $, ko) {
    var Player = (function () {
        function Player() {
            this.name = ko.observable();
        }
        return Player;
    })();
    exports.Player = Player;

    var Message = (function () {
        function Message() {
        }
        return Message;
    })();
    exports.Message = Message;

    var Main = (function () {
        function Main() {
            var _this = this;
            this.name = ko.observable('Anonyme');
            this.players = ko.observableArray();
            this.idToPlayer = {};
            this.logged = ko.observable(false);
            this.messages = ko.observableArray();
            this.message = ko.observable('');
            this.init = function () {
                console.log('connection ' + $.connection.hub.id);
                _this.logged(true);
                _this.proxy.server.setName(_this.name());
                _this.proxy.server.getPlayerList();
            };
            this.send = function () {
                _this.proxy.server.echo(_this.message());
                _this.message('');
            };
        }
        Main.prototype.run = function () {
            var _this = this;
            this.proxy = $.connection['gameHub'];
            this.proxy.client.addMessage = function (author, message) {
                _this.messages.push({ player: _this.idToPlayer[author], text: message });
            };
            this.proxy.client.setName = function (id, name) {
                if (_this.idToPlayer[id]) {
                    _this.idToPlayer[id].name(name);
                } else {
                    var newPlayer = { id: id, name: ko.observable(name) };
                    _this.players.push(newPlayer);
                    _this.idToPlayer[id] = newPlayer;
                }
                console.log(id + " a le nom " + name);
            };

            $.connection.hub.start().done(this.init).fail(function (message) {
                return console.log('connection failed ' + message);
            });

            this.name.subscribe(function (newValue) {
                if (_this.logged())
                    _this.proxy.server.setName(newValue);
            });

            ko.applyBindings(this);
        };
        return Main;
    })();
    exports.Main = Main;
});