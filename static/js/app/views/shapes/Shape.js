/**
 * Created by 世宁 on 13-12-26.
 */
define(function(){
    var Shape = Backbone.View.extend({
        tagName: "g",
        paper: null,
        draggable: true,
        raphaelObject: null,
        incomingConnections: [],
        outgoingConnections: [],
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
    return Shape;
});