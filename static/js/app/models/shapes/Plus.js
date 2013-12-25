/**
 * Created by 世宁 on 13-12-24.
 */
define(["models/shapes/Rect"],function(Rect){
    var Plus = Rect.extend({
        weight: 0,
        padding: 0
    });
    return Plus;
});