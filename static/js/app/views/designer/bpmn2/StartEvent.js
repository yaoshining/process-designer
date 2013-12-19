/**
 * Created by 世宁 on 13-12-19.
 */
define(["views/shapes/Circle","views/designer/ShapeHelper","models/shapes/Rect"],function(CircleView,ShapeHelper,ShapeHelperModel){
    return CircleView.extend({
        helper: null,
        draw: function(){
            CircleView.prototype.draw.apply(this);
            var model = this.model;
            var shapeHelperModel = new ShapeHelperModel({
                x: model.get("cx")-model.get("r")-5,
                y: model.get("cy")-model.get("r")-5,
                width: model.get("r")*2+10,
                height: model.get("r")*2+10,
                r: 0,
                "stroke-dasharray": ["."]
            });
            shapeHelperModel.unset("fill");
            var shapeHelper = new ShapeHelper({
                model: shapeHelperModel
            });
            shapeHelper.paper = this.paper;
            shapeHelper.draw();
            this.helper = shapeHelper;
        },
        moveHandler: function(dx,dy,shape) {
            var attr = {x: shape.ox+dx-shape.attrs.r-5,y: shape.oy+dy-shape.attrs.r-5};
            this.helper.raphaelObject.attr(attr);
        }
    });
});