define(["require", "exports", 'jquery', 'knockout'], function(require, exports, $, ko) {
    var Player = (function () {
        function Player(data) {
            this.name = ko.observable();
            this.points = ko.observable();
            this.id = data['Id'];
            this.name(data['Name']);
            this.points(data['Points']);
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

    var Question = (function () {
        function Question() {
            this.image = ko.observable();
        }
        return Question;
    })();
    exports.Question = Question;

    var Main = (function () {
        function Main() {
            var _this = this;
            this.name = ko.observable('Anonyme');
            this.players = ko.observableArray();
            this.idToPlayer = {};
            this.logged = ko.observable(false);
            this.messages = ko.observableArray();
            this.message = ko.observable('');
            this.question = new Question();
            this.init = function () {
                console.log('connection ' + $.connection.hub.id);
                _this.logged(true);
                _this.proxy.server.setName(_this.name());
                $.getJSON('/player').done(function (data) {
                    _this.players(data.map(function (value) {
                        var player = new Player(value);
                        _this.idToPlayer[player.id] = player;
                        return player;
                    }));
                });
            };
            this.send = function () {
                _this.proxy.server.addMessage(_this.message());
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
                    var newPlayer = { id: id, name: ko.observable(name), points: ko.observable(0) };
                    _this.players.push(newPlayer);
                    _this.idToPlayer[id] = newPlayer;
                }
                console.log(id + " a le nom " + name);
            };

            this.proxy.client.win = function (id, points) {
                _this.idToPlayer[id].points(points);
                _this.updateQuestion();
            };

            this.proxy.client.logout = function (id) {
                _this.players.remove(_this.idToPlayer[id]);
                delete _this.idToPlayer[id];
            };

            $.connection.hub.start().done(this.init).fail(function (message) {
                return console.log('connection failed ' + message);
            });

            this.name.subscribe(function (newValue) {
                if (_this.logged())
                    _this.proxy.server.setName(newValue);
            });

            this.updateQuestion();
            ko.applyBindings(this);
        };

        Main.prototype.updateQuestion = function () {
            var _this = this;
            $.getJSON('/question').done(function (data) {
                return _this.question.image(data['Image']);
            });
        };
        return Main;
    })();
    exports.Main = Main;
});
