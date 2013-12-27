/**
 * Created by 世宁 on 13-12-20.
 */
define(["views/shapes/Shape"],function(Shape){
    return Shape.extend({

        initialize: function() {

        },
        render: function(){
            var self = this;
            var x = this.model.get("x");
            var y = this.model.get("y");
            var width = this.model.get("width");
            var height = this.model.get("height");
            var path = ["M",x+width/2,y,"L",x+width,y+height/2,"L",x+width/2,y+height,"L",x,y+height/2,"Z"].join(",");
            var diamond = this.paper.path(path);
            diamond.attr({
                fill: this.model.get("fill"),
                stroke: this.model.get("stroke"),
                "stroke-dasharray": this.model.get("stroke-dasharray")
            });
            if(this.draggable)
                diamond.drag(this.move(this),this.dragger(this),this.up);
            this.raphaelObject = diamond;
            diamond.click(function(){
                self.click();
            });
            diamond.mouseup(function(){
                self.mouseup();
            });
        },
        draw: function() {
            this.render();
        },
        dragger: function(obj){
            return function(){
                $.canvas.$el.trigger("autoscroll");
                this.path = this.attr("path");
                this.animate({"fill-opacity": .2}, 500);
            }
        },
        up: function() {
            this.animate({"fill-opacity": 1}, 500);
        },
        move: function(obj) {
            return function(dx,dy){
                var attr = {path: Raphael.transformPath(this.path.toString(),"t"+dx+","+dy)};
                this.attr(attr);
                for(var i=0;i<obj.incomingConnections.length;i++) {
                    var conn = obj.incomingConnections[i];
                    obj.paper.connection(conn.raphaelObject);
                }
                for(var i=0;i<obj.outgoingConnections.length;i++) {
                    var conn = obj.outgoingConnections[i];
                    obj.paper.connection(conn.raphaelObject);
                }
                obj.moveHandler(dx,dy,this);
            }
        }
    });
});