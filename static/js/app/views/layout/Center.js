/**
 * Created by yao on 13-12-17.
 */
var Center = Backbone.View.extend({
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
    }
});
