/**
 * Created by 世宁 on 13-12-19.
 */
define(["views/shapes/Connection"],function(ConnectionView){
    var $connectButton = $("<div>").attr({
        id: "connectButton"
    }).append("连线").on("mousedown",function(){
        var conn = new ConnectionView();
        conn.paper = $.canvas.paper;
        conn.from = diagram.selected;
        $(this).data("conn",conn);
        var line;
        $.canvas.$el.on("mousemove",function(event){
            if(!line){
                line = $.canvas.paper.connectionAssist(conn.from.raphaelObject,{x: event.offsetX-1,y: event.offsetY},"#000");
            }
            else{
                line.to = {x: event.offsetX-1,y: event.offsetY};
                $.canvas.paper.connectionAssist(line);
            }
        });
        $("body").on("mouseup",function(){
            line.line.remove();
            $.canvas.$el.off("mousemove");
            $(this).off("mouseup");
        });
    });
   return $("<div>").append($connectButton).css({
        position: "absolute"
    }).appendTo("#center")[0];
});