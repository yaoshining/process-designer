/**
 * Created by 世宁 on 13-12-26.
 */
define(["views/designer/bpmn2/Gateway",
    "views/shapes/Circle",
    "models/shapes/Circle",
    "views/designer/ShapeHelper"],function(GatewayView,CircleView,CircleModel,ShapeHelper){
    var  InclusiveGateway = GatewayView.extend({
        render: function(){
            GatewayView.prototype.render.apply(this);
            var diamond = this.raphaelObject;
            var x = this.model.get("x");
            var y = this.model.get("y");
            var width = this.model.get("width");
            var height = this.model.get("height");
            var padding = this.model.get("padding");
            var circleModel = new CircleModel({
                cx: x+width/2,
                cy: y+height/2,
                r: (Math.min(width,height)-2*padding)/2,
                fill: "#fff",
                "stroke-width": 2
            });
            var circleView = new CircleView({
                model: circleModel
            });
            circleView.paper = this.paper;
            circleView.draggable = false;
            circleView.draw();
            var circle = circleView.raphaelObject;
            var st = this.paper.set();
            st.push(diamond,circle);
            st.drag(this.move(this),this.dragger(this),this.up);
            var self = this;
            st.click(function(){
                self.click();
            });
            st.mouseup(function(){
                self.mouseup();
            });
            this.raphaelObject = st;
            diagram.shapes.push(this);
        },
        moveHandler: function(dx,dy,shape) {
            var attr = {x: shape.ox+dx-5,y: shape.oy+dy-5};
            this.helper.model.set(attr);
            this.helper.raphaelObject.attr(attr);
        },
        dragger: function(obj){
            return function(){
                $.canvas.$el.trigger("autoscroll");
                var diamond = obj.raphaelObject[0];
                var circle = obj.raphaelObject[1];
                this.diamondPath = diamond.attr("path");
                this.ocircle = {ox: circle.attr("cx"),oy: circle.attr("cy")};
                this.ox = diamond.getBBox().x;
                this.oy = diamond.getBBox().y;
                this.animate({"fill-opacity": .2}, 500);
            }
        },
        selected: function(){
            for(var i=0;i<diagram.shapes.length;i++){
                diagram.shapes[i].unselected();
            }
            this.helper.show();
            diagram.selected = this;
        },
        unselected: function(){
            this.helper.raphaelObject.hide();
        },
        move: function(obj) {
            return function(dx,dy){
                var diamond = obj.raphaelObject[0];
                var diamondAttr = {path: Raphael.transformPath(this.diamondPath.toString(),"t"+dx+","+dy)};
                diamond.attr(diamondAttr);
                var circleAttr = {cx: this.ocircle.ox+dx,cy: this.ocircle.oy+dy};
                var circle = obj.raphaelObject[1];
                circle.attr(circleAttr);
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
        },
        mouseup: function() {
            var conn = $("#connectButton").data("conn");
            if(conn && conn.from!==this){
                conn.to = this;
                conn.draw();
                conn.from.incomingConnections.push(conn);
                this.outgoingConnections.push(conn);
                $("#connectButton").removeData("conn");
            }
        }
    });
    return InclusiveGateway;
});