/**
 * Created by 世宁 on 13-12-15.
 */
var North = Backbone.View.extend({
    tagName: "div",
    className: "ui-layout-north",
    initialize: function() {
        this.render();
    },
    render: function(){
        this.$el.html("North").appendTo($("body"));
    }
});