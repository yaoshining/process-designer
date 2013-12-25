/**
 * Created by 世宁 on 13-12-19.
 */
define(["views/shapes/Rect"],function(RectView){
    return RectView.extend({
        draggable: false,
        initialize: function(){
            $("#buttonPane").css({
                left: this.model.get("x")+this.model.get("width"),
                top: this.model.get("y")
            });
            this.listenTo(this.model,"change",function(){
                $("#buttonPane").css({
                    left: this.model.get("x")+this.model.get("width"),
                    top: this.model.get("y")
                });
            });
        },
        show: function(){
            this.raphaelObject.show();
            $("#buttonPane").css({
                left: this.model.get("x")+this.model.get("width"),
                top: this.model.get("y")
            });
        }
    });
});