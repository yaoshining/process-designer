/**
 * Created by 世宁 on 13-12-18.
 */
define(["models/shapes/Shape"],function(Shape){
    var Rect = Shape.extend({
        defaults: {
            type: "rect"
        },
        x: 0,
        y: 0,
        width: 0,
        height: 0,
        r: 0
    });
    _.extend(Rect.prototype.defaults,Shape.prototype.defaults);
    return Rect;
});