/**
 * Created by 世宁 on 13-12-19.
 */
define(["views/shapes/Rect",
        "views/designer/ShapeHelper"],function(RectView,ShapeHelper){
    return RectView.extend({
        helper: null,
        draw: function(){
            RectView.prototype.draw.apply(this);
            diagram.shapes.push(this);
            var shapeHelperModel = this.model.clone();
            shapeHelperModel.set("x",shapeHelperModel.get("x")-5);
            shapeHelperModel.set("y",shapeHelperModel.get("y")-5);
            shapeHelperModel.set("width",shapeHelperModel.get("width")+10);
            shapeHelperModel.set("height",shapeHelperModel.get("height")+10);
            shapeHelperModel.set("r",0);
            shapeHelperModel.unset("fill");
            shapeHelperModel.set("stroke-dasharray",["."]);
            var shapeHelper = new ShapeHelper({
                model: shapeHelperModel
            });
            shapeHelper.paper = this.paper;
            shapeHelper.draw();
            this.helper = shapeHelper;
        },
        moveHandler: function(dx,dy,shape) {
            var attr = {x: shape.ox+dx-5,y: shape.oy+dy-5};
            this.helper.model.set(attr);
            this.helper.raphaelObject.attr(attr);
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
        mouseup: function() {
            var conn = $("#connectButton").data("conn");
            if(conn && conn.from!==this){
                conn.to = this;
                conn.draw();
                conn.from.incomingConnections.push(conn);
                this.outgoingConnections.push(conn);
                $("#connectButton").removeData("conn");
            }
        },
        destroy: function(){
            RectView.prototype.destroy.apply(this);
            this.helper.destroy();
        }
    })
});
