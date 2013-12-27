/**
 * Created by 世宁 on 13-12-26.
 */
define(["views/designer/bpmn2/Gateway",
    "views/shapes/Crosses",
    "models/shapes/Crosses",
    "views/designer/ShapeHelper"],function(GatewayView,CrossesView,CrossesModel,ShapeHelper){
    var XORGateway = GatewayView.extend({
        render: function(){
            GatewayView.prototype.render.apply(this);
            var diamond = this.raphaelObject;
            var crossesModel = new CrossesModel({
                x: this.model.get("x")+2.5,
                y: this.model.get("y"),
                width: this.model.get("width")-5,
                height: this.model.get("height"),
                weight: this.model.get("weight"),
                padding: this.model.get("padding"),
                fill: "#000"
            });
            var crossesView = new CrossesView({
                model: crossesModel
            });
            crossesView.paper = this.paper;
            crossesView.draggable = false;
            crossesView.draw();
            var crosses = crossesView.raphaelObject;
            var st = this.paper.set();
            st.push(diamond,crosses);
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
                var crosses = obj.raphaelObject[1];

                this.diamondPath = diamond.attr("path");
                this.crossPath1 = crosses[0].attr("path");
                this.crossPath2 = crosses[1].attr("path");
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
                var crossAttr1 = {path: Raphael.transformPath(this.crossPath1.toString(),"t"+dx+","+dy)};
                var crossAttr2 = {path: Raphael.transformPath(this.crossPath2.toString(),"t"+dx+","+dy)};
                var crosses = obj.raphaelObject[1];
                crosses[0].attr(crossAttr1);
                crosses[1].attr(crossAttr2);
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
    return XORGateway;
});