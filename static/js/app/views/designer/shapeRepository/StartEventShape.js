/**
 * Created by 世宁 on 13-12-17.
 */
var StartEventShape = Backbone.View.extend({
    tagName: "li",
    icon: "images/bpmn2.0/icons/startevent/none.png",
    attribute: {
        id: "startEventShape"
    },
    initialize: function() {
        this.render();
    },
    render: function(){
        this.$el.append($("<img>").attr("src",this.icon)).append("开始事件");
    }
});