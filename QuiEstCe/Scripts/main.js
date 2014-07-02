require({
    paths: {
        'signalr-hub': '/signalr/js?noext'
    },
    shim: {
        'jquery.signalR': ['jquery'],
        'app/main': [, 'signalr-hub', 'knockout', 'jquery'],
        'signalr-hub': ['jquery.signalR', 'jquery']
    }
});

require(['app/main'], function (app) {
    var a = new app.Main();
    a.run();
});