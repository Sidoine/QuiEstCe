import $ = require('jquery');

export class Main {
    private proxy;

    public run() {
        this.proxy = $.connection.gameHub;
        this.proxy.client.addMessage = (message: string) => console.log(message);
        $.connection.hub.start().done(this.init).fail((message:string) => console.log('connection failed ' + message));
    }

    private init = () => {
        console.log('connection ' + $.connection.hub.id);
        this.proxy.server.echo('balbla');
    }
}


