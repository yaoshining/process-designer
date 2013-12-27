/**
 * Created by 世宁 on 13-12-26.
 */
define(["views/designer/bpmn2/Gateway",
    "views/shapes/Plus",
    "models/shapes/Plus",
    "views/designer/ShapeHelper"],function(GatewayView,PlusView,PlusModel,ShapeHelper){
    var ParallelGateway = GatewayView.extend({
        render: function(){
            GatewayView.prototype.render.apply(this);
            var diamond = this.raphaelObject;
            var plusModel = new PlusModel({
                x: this.model.get("x"),
                y: this.model.get("y"),
                width: this.model.get("width"),
                height: this.model.get("height"),
                weight: this.model.get("weight"),
                padding: this.model.get("padding"),
                fill: "#000"
            });
            var plusView = new PlusView({
                model: plusModel
            });
            plusView.paper = this.paper;
            plusView.draggable = false;
            plusView.draw();
            var plus = plusView.raphaelObject;
            var st = this.paper.set();
            st.push(diamond,plus);
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
                var diamond = obj.raphaelObject[0];
                var plus = obj.raphaelObject[1];
                this.diamondPath = diamond.attr("path");
                this.plusPath = plus.attr("path");
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
        up: function() {
            this.animate({"fill-opacity": 1}, 500);
        },
        move: function(obj) {
            return function(dx,dy){
                var diamond = obj.raphaelObject[0];
                var diamondAttr = {path: Raphael.transformPath(this.diamondPath.toString(),"t"+dx+","+dy)};
                diamond.attr(diamondAttr);
                var plusAttr = {path: Raphael.transformPath(this.plusPath.toString(),"t"+dx+","+dy)};
                var plus = obj.raphaelObject[1];
                plus.attr(plusAttr);
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
    return ParallelGateway;
});