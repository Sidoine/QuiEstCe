require({
    paths: {
        'signalr-hub': '/signalr/js?noext'
    },
    shim: {
        'jquery.signalR': ['jquery'],
        'app/main': ['jquery.signalR', 'signalr-hub'],
        'signalr-hub': ['jquery']
    }
});

require(['app/main'], function (app) {
    var a = new app.Main();
    a.run();
});