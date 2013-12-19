/**
 * Created by 世宁 on 13-12-17.
 */
define(function(){
    return Backbone.View.extend({
        tagName: "ul",
        className: "shape-repository",
        attribute: {
            id: "elementList"
        },
        initialize: function() {
            this.render();
        },
        render: function(){

        }
    });
});