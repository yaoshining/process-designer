/**
 * Created by 世宁 on 13-12-24.
 */
define(["views/designer/bpmn2/ParallelGateway",
    "models/shapes/Gateway"],function(ParallelGatewayView,ParallelGatewayModel){
    return Backbone.View.extend({
        tagName: "li",
        icon: "images/bpmn2.0/icons/gateway/parallel.png",
        attribute: {
            id: "parallelGatewayShape"
        },
        initialize: function() {
            this.render();
        },
        render: function(){
            this.$el.append($("<img>").attr("src",this.icon)).append("并行网关");
        },
        getShape: function() {
            var model = new ParallelGatewayModel({
                x: 100,
                y: 200,
                width: 40,
                height: 40,
                fill: "#fff",
                weight: 5,
                padding: 10
            });
            var view = new ParallelGatewayView({
                model: model
            });
            return view
        }
    });
});