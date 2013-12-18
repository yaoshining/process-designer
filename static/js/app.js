/**
 * Created by yao on 13-12-14.
 */
requirejs.config({
    "baseUrl": "js/lib",
    "paths": {
        "app": "../app",
        "views": "../app/views",
        "models": "../app/models",
        "controller": "../app/controller",
        "jquery": "jquery-latest",
        "underscore": "underscore",
        "backbone": "backbone",
        "layout": "jquery.layout-latest",
        "style": "../../css"
    },
    shim: {
        'backbone': {
            deps: ['underscore', 'jquery'],
            exports: "Backbone"
        },
        'layout': {
            deps: ['jquery']
        },
        'raphael-extend': {
            deps: ['raphael']
        },
        'jquery-ui': {
            deps: ['jquery']
        },
        'controller/Layout': {
            deps: ['backbone','layout']
        },
        'app/main': {
            deps: ['controller/Layout','jquery','backbone']
        }
    },
    map: {
        '*': {
            "css": "css"
        }
    }
});
requirejs(["app/main"]);