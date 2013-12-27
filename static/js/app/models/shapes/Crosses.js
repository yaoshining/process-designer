/**
 * Created by 世宁 on 13-12-26.
 */
define(["models/shapes/Rect"],function(Rect){
    var Crosses = Rect.extend({
        weight: 0,
        padding: 0
    });
    return Crosses;
});