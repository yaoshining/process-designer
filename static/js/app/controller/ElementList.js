/**
 * Created by 世宁 on 13-12-17.
 */
define(["views/designer/shapeRepository/ElementList",
        "views/designer/shapeRepository/TaskShape",
    "views/designer/shapeRepository/StartEventShape",
        "css!style/designer/shapeRepository"],function(){
    var elementList = new ElementList();
    var taskShape = new TaskShape();
    var startEventShape = new StartEventShape();
    elementList.$el.append(taskShape.$el);
    elementList.$el.append(startEventShape.$el);
    elementList.$el.appendTo($("#west"));
});