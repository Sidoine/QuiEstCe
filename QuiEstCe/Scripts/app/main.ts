import $ = require('jquery');
import ko = require('knockout');

export class Player {
    public name = ko.observable<string>();
    public id: string;
    public points = ko.observable<number>();

    constructor(data) {
        this.id = data['Id'];
        this.name(data['Name']);
        this.points(data['Points']);
    }
}

export class Message {
    public player: Player;
    public text: string;
}

export class Question {
    public image = ko.observable<string>();
    public name = ko.observable<string>();
}

export class Main {
    private proxy;
    public name = ko.observable<string>('Anonyme');
    public players = ko.observableArray<Player>();
    public idToPlayer: { [id: string]: Player } = {};
    public logged = ko.observable(false);
    public messages = ko.observableArray<Message>();
    public message = ko.observable('');
    public question = new Question();

    public run() {
        this.proxy = $.connection['gameHub'];
        this.proxy.client.addMessage = (author: string, message: string) => {
            this.messages.unshift({ player: this.idToPlayer[author], text: message });
        }
        this.proxy.client.setName = (id: string, name:string) => {
            if (this.idToPlayer[id]) {
                this.idToPlayer[id].name(name);
            }
            else {
                var newPlayer = { id: id, name: ko.observable(name), points: ko.observable(0) };
                this.players.push(newPlayer);
                this.idToPlayer[id] = newPlayer;
            }
            console.log(id + " a le nom " + name);
        }

        this.proxy.client.win = (id: string, points: number) => {
            this.idToPlayer[id].points(points);
            this.updateQuestion();
        };

        this.proxy.client.logout = (id: string) => {
            this.players.remove(this.idToPlayer[id]);
            delete this.idToPlayer[id];
        }
        
        $.connection.hub.start().done(this.init).fail((message:string) => console.log('connection failed ' + message));

        this.name.subscribe(newValue => {
            if (this.logged())
                this.proxy.server.setName(newValue);
        });

        this.updateQuestion();
        ko.applyBindings(this);
    }

    private updateQuestion() {
        $.getJSON('/question').done(data => {
            this.question.image(data['Image']);
            this.question.name(data['Name']);
        });
    }

    private init = () => {
        console.log('connection ' + $.connection.hub.id);
        this.logged(true);
        this.proxy.server.setName(this.name());
        $.getJSON('/player').done((data: any[]) => {
            this.players(data.map(value => {
                var player = new Player(value);
                this.idToPlayer[player.id] = player;
                return player;
            }));
        });
    }

    public send = () => {
        this.proxy.server.addMessage(this.message());
        this.message('');
    }
}


