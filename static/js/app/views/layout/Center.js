/**
 * Created by yao on 13-12-17.
 */
define(["views/shapes/Connection"],function(ConnectionView){
    return Backbone.View.extend({
        tagName: "div",
        className: "ui-layout-center",
        attributes: {
            id: "center"
        },
        events: {
            'mousemove': function(e){
//          console.log(e.clientX+","+ e.clientY);
            }
        },
        paper: undefined,
        initialize: function() {
            this.render();
        },
        render: function(){
            this.$el.appendTo($("body"));
            var $connectButton = $("<div>").attr({
                id: "connectButton"
            }).append("连线").on("mousedown",function(){
                var conn = new ConnectionView();
                conn.paper = $.canvas.paper;
                conn.from = diagram.selected;
                $(this).data("conn",conn);
                var line;
                $($.canvas.paper.canvas).on("mousemove",function(event){
                    if(!line){
                        line = $.canvas.paper.connectionAssist(conn.from.raphaelObject,{x: event.offsetX-1,y: event.offsetY},"#000");
                    }
                    else{
                        line.to = {x: event.offsetX-1,y: event.offsetY};
                        $.canvas.paper.connectionAssist(line);
                    }
                });
                $("body").one("mouseup",function(){
                    if(line)
                        line.line.remove();
                    $connectButton.removeData("conn");
                    $($.canvas.paper.canvas).off("mousemove");
                });
            });
            var $buttonPane = $("<div>").attr("id","buttonPane").append($connectButton).css({
                position: "absolute"
            }).hide();
            this.$el.append($buttonPane);
            this.$el.append($("<div>"));
        }
    });
});
