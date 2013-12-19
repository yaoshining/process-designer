/**
 * Created by 世宁 on 13-12-19.
 */
define(function(RectView,RectModel){
    return Backbone.View.extend({
        tagName: "li",
        icon: "images/bpmn2.0/icons/activity/task.png",
        attribute: {
            id: "taskShape"
        },
        initialize: function() {
            this.render();
        },
        render: function(){
            this.$el.append($("<img>").attr("src",this.icon)).append("任务");
        },
        getShape: function() {
            var rectModel = new RectModel({
                x: 0,
                y: 0,
                width: 100,
                height: 80,
                r: 10,
                fill: "0-#ffffff-#ffffcc"
            });
            var rect = new RectView({
                model: rectModel
            });
            return rect;
        }
    });
});