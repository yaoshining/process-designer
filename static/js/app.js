/**
 * Created by yao on 13-12-14.
 */
requirejs.config({
    "baseUrl": "js/lib",
    "paths": {
        "app": "../app",
        "jquery": "jquery-1.10.2",
        "underscore": "underscore",
        "backbone": "backbone"
    }
});
requirejs(["app/main"]);