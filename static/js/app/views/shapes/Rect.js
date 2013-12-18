/**
 * Created by 世宁 on 13-12-18.
 */
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
            var rect = this.paper.rect(this.model.get("x"),this.model.get("y"),this.model.get("width"),this.model.get("height"),this.model.get("r"));
            rect.attr({
                fill: this.model.get("fill"),
                stroke: this.model.get("stroke")
            });
            rect.drag(this.move,this.dragger,this.up);
            this.raphaelObject = rect;
        },
        draw: function() {
            this.render();
        },
        dragger: function(){
            this.ox = this.attr("x");
            this.oy = this.attr("y");
            this.animate({"fill-opacity": .2}, 500);
        },
        up: function() {
            this.animate({"fill-opacity": 1}, 500);
        },
        move: function(dx,dy) {
            var attr = {x: this.ox + dx, y: this.oy + dy};
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