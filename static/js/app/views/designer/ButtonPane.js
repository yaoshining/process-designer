/**
 * Created by 世宁 on 13-12-19.
 */
define(["views/shapes/Connection"],function(ConnectionView){
   return Backbone.View.extend({
       tagName: "div",
       el: "#buttonPane",
       attributes: {
           id: "buttonPane",
           style: "position: absolute;"
       },
       initialize: function() {
           this.render();
       },
       render: function(){
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
          this.$el.append($connectButton).css({
               position: "absolute"
           });
       }
   });;
});