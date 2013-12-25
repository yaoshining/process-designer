/**
 * Created by 世宁 on 13-12-17.
 */
define([
        "views/designer/bpmn2/EndEvent",
        "models/shapes/Circle"
    ],function(EndEventView,EndEventModel){
    return Backbone.View.extend({
        tagName: "li",
//        el: "#startEventShape",
        icon: "images/bpmn2.0/icons/endevent/none.png",
        attribute: {
            id: "endEventShape"
        },
        initialize: function() {
            this.render();
        },
        render: function(){
            this.$el.append($("<img>").attr("src",this.icon)).append("结束事件");
        },
        getShape: function() {
            var model = new EndEventModel({
                cx: 0,
                cy: 0,
                r: 20,
                "stroke-width": 3
            });
            var endEvent = new EndEventView({
                model: model
            });
            return endEvent;
        }
    });
});