/**
 * Created by yao on 13-12-17.
 */
define(function(){
    return Backbone.View.extend({
        el: "#center",
        paper: undefined,
        initialize: function() {
            var container = this.el;
            this.paper = new Raphael(container,$(container).innerWidth(),$(container).innerHeight());
            this.render();
        },
        render: function(){
            var paper = this.paper;
            var circle = paper.circle(50,50,20);
            circle.node.id = "circle";
            var rect = paper.rect(150,30,100,80,10);
            rect.node.id = "rect";
            rect.attr({
                "fill": "0-#ffffff-#ffffcc",
                "stroke": "#000",
                title: "Rect"
            });
            circle.attr({
                "fill": "#fff",
                "stroke": "#000"
            });
            var dragger = function () {
                this.ox = this.type == "rect" ? this.attr("x") : this.attr("cx");
                this.oy = this.type == "rect" ? this.attr("y") : this.attr("cy");
                this.animate({"fill-opacity": .2}, 500);
            };
            var up = function () {
                this.animate({"fill-opacity": 1}, 500);
            };
            var move = function(dx,dy){
                var attr = this.type == "rect" ? {x: this.ox + dx, y: this.oy + dy} : {cx: this.ox + dx, cy: this.oy + dy};
                this.attr(attr);
                paper.connection(conn);
            };
            circle.drag(move,dragger,up);
            rect.drag(move,dragger,up);
            var conn = paper.connection(circle, rect, "#000");
        }
    });
});