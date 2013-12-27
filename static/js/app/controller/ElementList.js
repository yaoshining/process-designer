/**
 * Created by 世宁 on 13-12-17.
 */
define(["views/designer/shapeRepository/ElementList",
        "views/designer/shapeRepository/TaskShape",
        "views/designer/shapeRepository/StartEventShape",
        "views/designer/shapeRepository/EndEventShape",
        "views/designer/shapeRepository/ParallelGatewayShape",
        "views/designer/shapeRepository/XORGatewayShape",
        "views/designer/shapeRepository/DragHelper",
        "models/shapes/Shape",
        "css!style/designer/shapeRepository"],function(ElementList,TaskShape,StartEventShape,EndEventShape,ParallelGatewayShape,XORGatewayShape,DragHelper){
    var elementList = new ElementList();
    var taskShape = new TaskShape();
    var startEventShape = new StartEventShape();
    var endEventShape = new EndEventShape();
    var parallelGatewayShape = new ParallelGatewayShape();
    var xorGatewayShape = new XORGatewayShape();
    var shapeList = new Array();
    shapeList.push(taskShape);
    shapeList.push(startEventShape);
    shapeList.push(parallelGatewayShape);
    shapeList.push(xorGatewayShape);
    shapeList.push(endEventShape);
    elementList.$el.append(taskShape.$el);
    elementList.$el.append(startEventShape.$el);
    elementList.$el.append(parallelGatewayShape.$el);
    elementList.$el.append(xorGatewayShape.$el);
    elementList.$el.append(endEventShape.$el);
    elementList.$el.appendTo($("#west"));
    var mousedownHandler = function(shapeView) {
        return function(){
            var dragHelper = new DragHelper();
            dragHelper.setStatus({
                flag: false,
                icon: $(this).find("img").attr("src"),
                text: $(this).text(),
                shape: shapeView.getShape()
            });
            $("body").on("mousemove",function(e){
                dragHelper.$el.trigger("move", [e]);
                dragHelper.$el.show();
            }).on("mouseup",function(){
                    $(this).off("mousemove");
                    Layout.center.$el.off("mouseup");
                    Layout.center.$el.off("mousemove");
                    Layout.center.$el.off("mouseout");
                    $(this).off("mouseup");
                    dragHelper.remove();
                });
            $("#center").on("mouseup",function(event){
                var shape = dragHelper.status.shape;
                shape.model.set(shape.model.get("type")=="circle"?{cx: event.offsetX,cy: event.offsetY}:{x:event.offsetX,y:event.offsetY});
                shape.paper = $.canvas.paper;
                shape.draw();
                shape.selected();
                $(this).off("mouseup");
                $(this).off("mousemove");
                $(this).off("mouseout");
            }).on("mousemove",function(){
                    var status = dragHelper.status;
                    status.flag = true;
                    dragHelper.setStatus(status);
            }).on("mouseout",function(){
                    var status = dragHelper.status;
                    status.flag = false;
                    dragHelper.setStatus(status);
            });
        }
    }
    for(var i=0;i<shapeList.length;i++) {
        var shapeView = shapeList[i];
        shapeView.$el.on("mousedown",mousedownHandler(shapeView));
    }
});