/**
 * Created by 世宁 on 13-12-17.
 */
var TaskShape = Backbone.View.extend({
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
    }
});
