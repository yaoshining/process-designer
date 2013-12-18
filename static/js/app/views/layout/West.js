/**
 * Created by yao on 13-12-17.
 */
define(function(){
    return Backbone.View.extend({
        tagName: "div",
        className: "ui-layout-west",
        attributes: {
            id: "west"
        },
        initialize: function() {
            this.render();
        },
        events: {
            selectstart: function() {
                return false;
            }
        },
        render: function(){
            this.$el.append($("<div>").addClass("header").html("图形库")).appendTo($("body"));
        }
    });
});