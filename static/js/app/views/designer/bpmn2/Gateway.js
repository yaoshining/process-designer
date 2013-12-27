/**
 * Created by 世宁 on 13-12-24.
 */
define(["views/shapes/Diamond","views/designer/ShapeHelper"],function(DiamondView,ShapeHelper){
    var Gateway = DiamondView.extend({
        helper: null,
        draggable: false,
        render: function(){
            DiamondView.prototype.render.apply(this);
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
        }
    });
    return Gateway;
});