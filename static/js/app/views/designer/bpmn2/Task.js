/**
 * Created by 世宁 on 13-12-19.
 */
define(["views/shapes/Rect",
        "views/designer/ShapeHelper"],function(RectView,ShapeHelper){
    return RectView.extend({
        helper: null,
        draw: function(){
            RectView.prototype.draw.apply(this);
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
        }
    })
});
