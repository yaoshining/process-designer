/**
 * Created by yao on 13-12-17.
 */
var South = Backbone.View.extend({
    tagName: "div",
    className: "ui-layout-south",
    initialize: function() {
        this.render();
    },
    render: function(){
        this.$el.html("South1").appendTo($("body"));
    }
});