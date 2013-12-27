/**
 * Created by 世宁 on 13-12-24.
 */
define(["views/designer/bpmn2/XORGateway",
    "models/shapes/XORGateway"],function(XORGatewayView,XORGatewayModel){
    return Backbone.View.extend({
        tagName: "li",
        icon: "images/bpmn2.0/icons/gateway/exclusive.databased.png",
        attribute: {
            id: "xorGatewayShape"
        },
        initialize: function() {
            this.render();
        },
        render: function(){
            this.$el.append($("<img>").attr("src",this.icon)).append("基于数据的独占(XOR)网关");
        },
        getShape: function() {
            var model = new XORGatewayModel({
                x: 100,
                y: 200,
                width: 40,
                height: 40,
                fill: "#fff",
                weight: 4,
                padding: 11
            });
            var view = new XORGatewayView({
                model: model
            });
            return view
        }
    });
});