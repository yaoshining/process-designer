/**
 * Created by 世宁 on 13-12-24.
 */
define(["views/designer/bpmn2/InclusiveGateway",
    "models/shapes/InclusiveGateway"],function(InclusiveGatewayView,InclusiveGatewayModel){
    return Backbone.View.extend({
        tagName: "li",
        icon: "images/bpmn2.0/icons/gateway/inclusive.png",
        attribute: {
            id: "inclusiveGatewayShape"
        },
        initialize: function() {
            this.render();
        },
        render: function(){
            this.$el.append($("<img>").attr("src",this.icon)).append("包含网关");
        },
        getShape: function() {
            var model = new InclusiveGatewayModel({
                x: 100,
                y: 200,
                width: 40,
                height: 40,
                fill: "#fff",
                weight: 5,
                padding: 10
            });
            var view = new InclusiveGatewayView({
                model: model
            });
            return view
        }
    });
});