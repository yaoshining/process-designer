/**
 * Created by yao on 13-12-14.
 */
requirejs.config({
    "baseUrl": "js/lib",
    "paths": {
        "app": "../app",
        "views": "../app/views",
        "jquery": "jquery-latest",
        "underscore": "underscore",
        "backbone": "backbone",
        "layout": "jquery.layout-latest"
    },
    shim: {
        'backbone': {
            deps: ['underscore', 'jquery'],
            exports: "Backbone"
        },
        'layout': {
            deps: ['jquery']
        }
    }
});
requirejs(["app/main"]);