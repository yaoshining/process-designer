/**
 * Created by yao on 13-12-17.
 */
var West = Backbone.View.extend({
    tagName: "div",
    className: "ui-layout-west",
    attributes: {
      id: "west"
    },
    initialize: function() {
        this.render();
    },
    render: function(){
        this.$el.append($("<div>").addClass("header").html("图形库")).appendTo($("body"));
    }
});