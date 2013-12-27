/**
 * Created by 世宁 on 13-12-26.
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
            var weight = this.model.get("weight");
            var padding = this.model.get("padding");
            var p = [
                {x: x+padding,y: y+padding},
                {x: x+padding+weight,y: y+padding},
                {x: x+width-padding,y: y+height-padding},
                {x: x+width-padding-weight,y: y+height-padding},
                {x: x+width-padding,y: y+padding},
                {x: x+width-padding-weight,y: y+padding},
                {x: x+padding,y: y+height-padding},
                {x: x+padding+weight,y: y+height-padding}
            ];
            var path1 = ["M",p[0].x,p[0].y,"L",p[1].x,p[1].y,"L",p[2].x,p[2].y,"L",p[3].x,p[3].y,"Z"].join(",");
            var path2 = ["M",p[4].x,p[4].y,"L",p[5].x,p[5].y,"L",p[6].x,p[6].y,"L",p[7].x,p[7].y,"Z"].join(",");
            var crosses = this.paper.set(
                this.paper.path(path1),
                this.paper.path(path2)
            );
            crosses.attr({
                fill: this.model.get("fill"),
                stroke: this.model.get("stroke"),
                "stroke-dasharray": this.model.get("stroke-dasharray")
            });
            if(this.draggable)
                crosses.drag(this.move(this),this.dragger(this),this.up);
            this.raphaelObject = crosses;
            crosses.click(function(){
                self.click();
            });
            crosses.mouseup(function(){
                self.mouseup();
            });
        },
        draw: function() {
            this.render();
        },
        dragger: function(obj){
            return function(){
                $.canvas.$el.trigger("autoscroll");
                var cross1 = obj.raphaelObject[0];
                var cross2 = obj.raphaelObject[1];
                this.path1 = cross1.attr("path");
                this.path2 = cross2.attr("path");
//                obj.raphaelObject.animate({"fill-opacity": .2}, 500);
            }
        },
        move: function(obj) {
            return function(dx,dy){
                var cross1 = obj.raphaelObject[0];
                var crossAttr1 = {path: Raphael.transformPath(this.path1.toString(),"t"+dx+","+dy)};
                cross1.attr(crossAttr1);
                var crossAttr2 = {path: Raphael.transformPath(this.path2.toString(),"t"+dx+","+dy)};
                var cross2 = obj.raphaelObject[1];
                cross2.attr(crossAttr2);
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