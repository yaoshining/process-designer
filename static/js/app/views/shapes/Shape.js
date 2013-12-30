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

        },
        up: function(e){
            this.animate({"fill-opacity": 1}, 500);
            if(e.pageX<Layout.west.el.clientWidth+Layout.center.el.clientWidth && e.pageY>Layout.north.el.clientHeight && e.pageX>Layout.west.el.clientWidth+5 && e.pageY<Layout.north.el.clientHeight+Layout.center.el.clientHeight){
//                this.transform("t"+ e.offsetX+","+ e.offsetY);
                console.log(e.offsetX+","+ e.offsetY);
            }
        },
        destroy: function(){
            this.raphaelObject.remove();
            console.log(this.incomingConnections.length);
            for(var i=0;i<this.incomingConnections.length;i++) {
                var conn = this.incomingConnections[i];
                console.log(conn);
            }
            console.log(this.outgoingConnections.length);
            for(var i=0;i<this.outgoingConnections.length;i++) {
                var conn = this.outgoingConnections[i];
                console.log(conn);
            }
        }
    });
    return Shape;
});