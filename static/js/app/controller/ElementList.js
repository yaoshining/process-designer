/**
 * Created by 世宁 on 13-12-17.
 */
define(["views/designer/shapeRepository/ElementList",
        "views/designer/shapeRepository/TaskShape",
        "views/designer/shapeRepository/StartEventShape",
        "views/designer/shapeRepository/DragHelper",
        "models/shapes/Shape",
        "css!style/designer/shapeRepository"],function(ElementList,TaskShape,StartEventShape,DragHelper,ShapeModel){
    var elementList = new ElementList();
    var taskShape = new TaskShape();
    var startEventShape = new StartEventShape();
    var shapeList = new Array();
    shapeList.push(taskShape);
    shapeList.push(startEventShape);
    elementList.$el.append(taskShape.$el);
    elementList.$el.append(startEventShape.$el);
    elementList.$el.appendTo($("#west"));
    var mousedownHandler = function(shapeView) {
        return function(){
            var dragHelper = new DragHelper();
            dragHelper.$el.trigger("move");
            dragHelper.setStatus({
                flag: false,
                icon: $(this).find("img").attr("src"),
                text: $(this).text(),
                shape: shapeView.getShape()
            });
            dragHelper.$el.show();
            $("body").on("mousemove",function(){
                dragHelper.$el.trigger("move");
            }).on("mouseup",function(){
                    $(this).off("mousemove");
                    $(this).off("mouseup");
                    dragHelper.remove();
                });
            $("#center").on("mouseup",function(){
                var shape = dragHelper.status.shape;
                shape.model.set(shape.model.get("type")=="circle"?{cx: event.offsetX,cy: event.offsetY}:{x:event.offsetX,y:event.offsetY});
                shape.paper = $.canvas.paper;
                shape.draw();
                $(this).off("mouseup");
            });
        }
    }
    for(var i=0;i<shapeList.length;i++) {
        var shapeView = shapeList[i];
        shapeView.$el.on("mousedown",mousedownHandler(shapeView));
    }
});