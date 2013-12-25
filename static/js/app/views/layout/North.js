/**
 * Created by 世宁 on 13-12-15.
 */
define(function(){
    return Backbone.View.extend({
        tagName: "div",
        className: "ui-layout-north",
        attributes: {
            id: "north"
        },
        initialize: function() {
            this.render();
        },
        render: function(){
            this.$el.html("North").appendTo($("body"));
        }
    });
});