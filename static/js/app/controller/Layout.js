/**
 * Created by yao on 13-12-17.
 */
requirejs.config({
    shim: {
        'views/layout/Center': {
            deps: ['raphael']
        },
        'views/designer/Canvas': {
            deps: ['raphael-extend']
        }
    }
});
require([
    "views/layout/North",
    "views/layout/South",
    "views/layout/East",
    "views/layout/West",
    "views/layout/Center",
    "views/layout/Settings",
    "views/designer/Canvas",
    "views/shapes/Circle",
    "views/shapes/Rect",
    "views/shapes/Connection",
    "models/shapes/Circle",
    "models/shapes/Rect"],function(North,South,East,West,Center,layoutSettings,Canvas,CircleView,RectView,ConnectionView,CircleModel,RectModel){
    Layout.north = new North();
    Layout.south = new South();
    Layout.east = new East();
    Layout.west = new West();
    Layout.center = new Center();
    $(function(){
        var layout = $("body").layout(layoutSettings);
        var westSelector = "body > .ui-layout-west";
        var eastSelector = "body > .ui-layout-east";
        $("<span></span>").attr("id", "west-closer" ).prependTo(westSelector);
        $("<span></span>").attr("id", "east-closer" ).prependTo(eastSelector);
        layout.addCloseBtn("#west-closer", "west");
        layout.addCloseBtn("#east-closer", "east");
        var canvas = new Canvas();
        $.canvas = canvas;
        var circleModel = new CircleModel({
            cx: 50,
            cy: 50,
            r: 20
        });
        var circle = new CircleView({
            model: circleModel
        });
        circle.paper = canvas.paper;
        circle.draw();
        var rectModel = new RectModel({
            x: 150,
            y: 30,
            width: 100,
            height: 80,
            r: 10,
            fill: "0-#ffffff-#ffffcc"
        });
        var rect = new RectView({
            model: rectModel
        });
        rect.paper = canvas.paper;
        rect.draw();
        var conn = new ConnectionView();
        conn.paper = canvas.paper;
        conn.from = circle;
        conn.to = rect;
        circle.addOutgoing(conn);
        rect.addIncoming(conn);
        conn.draw();
        require(["controller/ElementList"]);
    });
});