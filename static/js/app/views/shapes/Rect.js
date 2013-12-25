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
        draggable: true,
        raphaelObject: null,
        incomingConnections: [],
        outgoingConnections: [],
        initialize: function() {

        },
        render: function(){
            var self = this;
            var rect = this.paper.rect(this.model.get("x"),this.model.get("y"),this.model.get("width"),this.model.get("height"),this.model.get("r"));
            rect.attr({
                fill: this.model.get("fill"),
                stroke: this.model.get("stroke"),
                "stroke-dasharray": this.model.get("stroke-dasharray")
            });
            if(this.draggable)
                rect.drag(this.move(this),this.dragger,this.up);
            this.raphaelObject = rect;
            rect.click(function(){
                self.click();
            });
            rect.mouseup(function(){
                self.mouseup();
            });
        },
        draw: function() {
            this.render();
        },
        dragger: function(x,y,e){
            this.ox = this.attr("x");
            this.oy = this.attr("y");
            this.animate({"fill-opacity": .2}, 500);
            this.mouseout(function(){
                console.log(e.offsetX);
            });
        },
        up: function() {
            this.animate({"fill-opacity": 1}, 500);
        },
        move: function(obj) {
            return function(dx,dy,x,y,e){
                var attr = {x: this.ox + dx, y: this.oy + dy};
                this.attr(attr);
                for(var i=0;i<obj.incomingConnections.length;i++) {
                    var conn = obj.incomingConnections[i];
                    obj.paper.connection(conn.raphaelObject);
                }
                for(var i=0;i<obj.outgoingConnections.length;i++) {
                    var conn = obj.outgoingConnections[i];
                    obj.paper.connection(conn.raphaelObject);
                }
//                if(e.clientY-$.canvas.el.clientHeight>0) {
//                    $.canvas.$el.scrollTop($.canvas.$el.scrollTop()+attr.y-preY);
//                }
                obj.moveHandler(dx,dy,this);
            }
        },
        addIncoming: function(conn){
            this.incomingConnections.push(conn);
        },
        addOutgoing: function(conn) {
            this.outgoingConnections.push(conn);
        },
        moveHandler: function(dx,dy,shape){

        },
        selected: function(){

        },
        unselected: function(){

        },
        click: function() {
            this.selected();
        },
        mouseup: function(){

        }
    });
});