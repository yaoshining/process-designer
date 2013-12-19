/**
 * Created by 世宁 on 13-12-17.
 */
define([
        "views/designer/bpmn2/StartEvent",
        "models/shapes/Circle"
    ],function(StartEventView,StartEventModel){
    return Backbone.View.extend({
        tagName: "li",
//        el: "#startEventShape",
        icon: "images/bpmn2.0/icons/startevent/none.png",
        attribute: {
            id: "startEventShape"
        },
        initialize: function() {
            this.render();
        },
        render: function(){
            this.$el.append($("<img>").attr("src",this.icon)).append("开始事件");
        },
        getShape: function() {
            var model = new StartEventModel({
                cx: 0,
                cy: 0,
                r: 20
            });
            var startEvent = new StartEventView({
                model: model
            });
            return startEvent;
        }
    });
});