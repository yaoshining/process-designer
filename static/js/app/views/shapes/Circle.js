/**
 * Created by 世宁 on 13-12-18.
 */
define(function(){
    return Backbone.View.extend({
        tagName: "g",
        paper: null,
        raphaelObject: null,
        incomingConnections: [],
        outgoingConnections: [],
        initialize: function() {

        },
        render: function(){
            var circle = this.paper.circle(this.model.get("cx"),this.model.get("cy"),this.model.get("r"));
            circle.attr({
                fill: this.model.get("fill"),
                stroke: this.model.get("stroke")
            });
            circle.drag(this.move,this.dragger,this.up);
            this.raphaelObject = circle;
        },
        draw: function() {
            this.render();
        },
        dragger: function(){
            this.ox = this.attr("cx");
            this.oy = this.attr("cy");
            this.animate({"fill-opacity": .2}, 500);
        },
        up: function() {
            this.animate({"fill-opacity": 1}, 500);
        },
        move: function(dx,dy) {
            var attr = {cx: this.ox + dx, cy: this.oy + dy};
            this.attr(attr);
        },
        addIncoming: function(conn){
            this.incomingConnections.push(conn);
        },
        addOutgoing: function(conn) {
            this.outgoingConnections.push(conn);
        }
    });
});