/**
 * Created by yao on 13-12-17.
 */
var West = Backbone.View.extend({
    tagName: "div",
    className: "ui-layout-west",
    attribute: {
      id: "west"
    },
    initialize: function() {
        this.render();
    },
    render: function(){
        this.$el.append($("<div>").addClass("header").html("West")).appendTo($("body"));
    }
});