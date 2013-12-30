/**
 * Created by yao on 13-12-17.
 */
define(["views/designer/bpmn2/InclusiveGateway",
        "models/shapes/Gateway",
        "views/shapes/Crosses",
        "models/shapes/Crosses"],function(InclusiveGatewayView,InclusiveGatewayModel,CrossesView,CrossesModel){
    return Backbone.View.extend({
        el: "#center",
        paper: undefined,
        initialize: function() {
            var container = this.el;
            this.paper = new Raphael(container,1485,1650);
            this.render();
        },
        events: {
          "autoscroll": function(){
              var int;
                $("body").on("mousemove",function(e){
                    if(e.pageY>Layout.north.el.clientHeight+Layout.center.el.clientHeight && !int){
                        int = setInterval(function(){
                            Layout.center.$el.scrollTop(Layout.center.$el.scrollTop()+10);
                        },20);
                    }
                    if(e.pageX<Layout.west.el.clientWidth+Layout.center.el.clientWidth && e.pageY>Layout.north.el.clientHeight && e.pageX>Layout.west.el.clientWidth+5 && e.pageY<Layout.north.el.clientHeight+Layout.center.el.clientHeight && int){
                        clearInterval(int);
                        int = undefined;
                    }
                    if(e.pageX<Layout.west.el.clientWidth+5 && !int){
                        int = setInterval(function(){
                            Layout.center.$el.scrollLeft(Layout.center.$el.scrollLeft()-10);
                        },20);
                    }
                    if(e.pageY<Layout.north.el.clientHeight && !int){
                        int = setInterval(function(){
                            Layout.center.$el.scrollTop(Layout.center.$el.scrollTop()-10);
                        },20);
                    }
                    if(e.pageX>Layout.west.el.clientWidth+Layout.center.el.clientWidth && !int){
                        int = setInterval(function(){
                            Layout.center.$el.scrollLeft(Layout.center.$el.scrollLeft()+10);
                        },20);
                    }
                }).one("mouseup",function(){
                  $(this).off("mousemove");
                  clearInterval(int);
              });
          },
          "mousemove": function(e){

          }
        },
        render: function(){
            $("body").keydown(function(e){
                if(e.which==46){
                    diagram.selected.unselected();
                    diagram.selected.destroy();
                    diagram.shapes.pop(diagram.selected);
                    diagram.selected = undefined;
                }
            });
            if (typeof(this.paper.canvas.onselectstart) != "undefined") {
                // IE下禁止元素被选取
                this.paper.canvas.onselectstart = new Function("return false");
            } else {
                // firefox下禁止元素被选取的变通办法
                this.paper.canvas.onmousedown = new Function("return false");
                this.paper.canvas.onmouseup = new Function("return true");
            }
//            var int;
//            center.$el.on("mousemove",function(e){
//                if(e.clientY>north.el.clientHeight+center.el.clientHeight && !int){
//                    int = setInterval(function(){
//                        center.$el.scrollTop(center.$el.scrollTop()+10);
//                    },10);
//                }
//                if(e.clientY<north.el.clientHeight+center.el.clientHeight && int){
//                    clearInterval(int);
//                    int = undefined;
//                }
//            });
//            var paper = this.paper;
//            var model = new InclusiveGatewayModel({
//                x: 100,
//                y: 200,
//                width: 40,
//                height: 40,
//                fill: "#fff",
//                weight: 5,
//                padding: 10
//            });
//            var view = new InclusiveGatewayView({
//                model: model
//            });
//            view.paper = paper;
//            view.draw();
//            var circle = paper.circle(50,50,20);
//            circle.node.id = "circle";
//            var rect = paper.rect(150,30,100,80,10);
//            rect.node.id = "rect";
//            rect.attr({
//                "fill": "0-#ffffff-#ffffcc",
//                "stroke": "#000",
//                title: "Rect"
//            });
//            circle.attr({
//                "fill": "#fff",
//                "stroke": "#000"
//            });
//            var dragger = function () {
//                this.ox = this.type == "rect" ? this.attr("x") : this.attr("cx");
//                this.oy = this.type == "rect" ? this.attr("y") : this.attr("cy");
//                this.animate({"fill-opacity": .2}, 500);
//            };
//            var up = function () {
//                this.animate({"fill-opacity": 1}, 500);
//            };
//            var move = function(dx,dy){
//                var attr = this.type == "rect" ? {x: this.ox + dx, y: this.oy + dy} : {cx: this.ox + dx, cy: this.oy + dy};
//                this.attr(attr);
//                paper.connection(conn);
//            };
//            circle.drag(move,dragger,up);
//            rect.drag(move,dragger,up);
//            var conn = paper.connection(circle, rect, "#000");
        }
    });
});