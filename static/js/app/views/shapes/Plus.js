/**
 * Created by 世宁 on 13-12-23.
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
                {x: x+(width-weight)/2, y: y+padding},
                {x: x+(width+weight)/2, y: y+padding},
                {x: x+(width+weight)/2, y: y+(height-weight)/2},
                {x: x+width-padding, y: y+(height-weight)/2},
                {x: x+width-padding, y: y+(height+weight)/2},
                {x: x+(width+weight)/2,y: y+(height+weight)/2},
                {x: x+(width+weight)/2,y: y+height-padding},
                {x: x+(width-weight)/2,y: y+height-padding},
                {x: x+(width-weight)/2,y: y+(height+weight)/2},
                {x: x+padding,y: y+(height+weight)/2},
                {x: x+padding,y: y+(height-weight)/2},
                {x: x+(width-weight)/2,y: y+(height-weight)/2}
            ];
            var path = ["M",p[0].x,p[0].y,"L",p[1].x,p[1].y,"L",p[2].x,p[2].y,"L",p[3].x,p[3].y,"L",p[4].x,p[4].y,"L",p[5].x,p[5].y,"L",p[6].x,p[6].y,
                "L",p[7].x,p[7].y,"L",p[8].x,p[8].y,"L",p[9].x,p[9].y,"L",p[10].x,p[10].y,"L",p[11].x,p[11].y,"Z"].join(",");
            var plus = this.paper.path(path);
            plus.attr({
                fill: this.model.get("fill"),
                stroke: this.model.get("stroke"),
                "stroke-dasharray": this.model.get("stroke-dasharray")
            });
            if(this.draggable)
                plus.drag(this.move(this),this.dragger,this.up);
            this.raphaelObject = plus;
            plus.click(function(){
                self.click();
            });
            plus.mouseup(function(){
                self.mouseup();
            });
        },
        draw: function() {
            this.render();
        },
        dragger: function(){
            $.canvas.$el.trigger("autoscroll");
            this.path = this.attr("path");
            this.animate({"fill-opacity": .2}, 500);
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