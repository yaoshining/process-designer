/**
 * Created by 世宁 on 13-12-18.
 */
define(["views/shapes/Shape"],function(Shape){
    var Circle = Shape.extend({

        initialize: function() {

        },
        render: function(){
            var self = this;
            var circle = self.paper.circle(self.model.get("cx"),self.model.get("cy"),self.model.get("r"));
            circle.attr({
                fill: self.model.get("fill"),
                stroke: self.model.get("stroke"),
                "stroke-width": self.model.get("stroke-width")
            });
            if(this.draggable)
                circle.drag(self.move(self),self.dragger,self.up);
            self.raphaelObject = circle;
            circle.click(function(){
                self.click();
            });
            circle.mouseup(function(){
                self.mouseup();
            });
        },
        draw: function() {
            this.render();
        },
        dragger: function(){
            $.canvas.$el.trigger("autoscroll");
            this.ox = this.attr("cx");
            this.oy = this.attr("cy");
            this.animate({"fill-opacity": .2}, 500);
        },
        move: function(obj) {
            return function(dx,dy){
                var attr = {cx: this.ox + dx, cy: this.oy + dy};
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
    return Circle;
});