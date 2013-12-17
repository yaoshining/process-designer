/**
 * Created by yao on 13-12-17.
 */
var East = Backbone.View.extend({
    tagName: "div",
    className: "ui-layout-east",
    attributes: {
      id: "east"
    },
    initialize: function() {
        this.render();
    },
    render: function(){
        this.$el.append($("<div>").addClass("header").html("East")).appendTo($("body"));
    }
});