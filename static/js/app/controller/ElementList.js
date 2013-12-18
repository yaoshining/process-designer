/**
 * Created by 世宁 on 13-12-17.
 */
define(["views/designer/shapeRepository/ElementList",
        "views/designer/shapeRepository/TaskShape",
        "views/designer/shapeRepository/StartEventShape",
        "views/designer/shapeRepository/DragHelper",
        "css!style/designer/shapeRepository"],function(){
    var elementList = new ElementList();
    var taskShape = new TaskShape();
    var startEventShape = new StartEventShape();
    var shapeList = new Array();
    shapeList.push(taskShape);
    shapeList.push(startEventShape);
    elementList.$el.append(taskShape.$el);
    elementList.$el.append(startEventShape.$el);
    elementList.$el.appendTo($("#west"));
    for(var i=0;i<shapeList.length;i++) {
        shapeList[i].$el.on("mousedown",function(){
            var dragHelper = new DragHelper();
            dragHelper.$el.trigger("move");
            dragHelper.setStatus({
                flag: false,
                icon: $(this).find("img").attr("src"),
                text: $(this).text()
            });
            dragHelper.$el.show();
            $("body").on("mousemove",function(){
                dragHelper.$el.trigger("move");
            }).on("mouseup",function(){
                $(this).off("mousemove");
                $(this).off("mouseup");
                dragHelper.remove();
            });
            $("#center").on("mouseenter",function(){
                console.log(event.pageX);
            });
        });
    }
});