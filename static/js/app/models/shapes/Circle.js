/**
 * Created by 世宁 on 13-12-18.
 */
define(["models/shapes/Shape"],function(Shape){
    var Circle = Shape.extend({
        defaults: {
          type: "circle"
        },
        cx: 0,
        cy: 0,
        r: 0
    });
    _.extend(Circle.prototype.defaults,Shape.prototype.defaults);
    return Circle;
});