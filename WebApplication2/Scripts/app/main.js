define(["require", "exports", 'jquery'], function(require, exports, $) {
    var Main = (function () {
        function Main() {
            var _this = this;
            this.init = function () {
                console.log('connection ' + $.connection.hub.id);
                _this.proxy.server.echo('balbla');
            };
        }
        Main.prototype.run = function () {
            this.proxy = $.connection.gameHub;
            this.proxy.client.addMessage = function (message) {
                return console.log(message);
            };
            $.connection.hub.start().done(this.init).fail(function (message) {
                return console.log('connection failed ' + message);
            });
        };
        return Main;
    })();
    exports.Main = Main;
});
