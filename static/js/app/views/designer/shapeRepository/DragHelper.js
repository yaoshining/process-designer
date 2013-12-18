/**
 * Created by 世宁 on 13-12-18.
 */
var DragHelper = Backbone.View.extend({
    tagName: "div",
    className: "drag-helper",
    attribute: {
        id: "dragHelper"
    },
    status: {
        flag: false,
        icon: "",
        text: ""
    },
    events: {
      "move": function(){
          this.$el.css({
              left: event.pageX+15,
              top: event.pageY+15
          });
      }
    },
    initialize: function() {
        this.$el.hide();
    },
    render: function(){
        this.$el.append($("<img>").attr("src",this.status.flag?"images/icons/famfamfam/accept.png":"images/icons/famfamfam/cross.png"))
                .append($("<img>").attr("src",this.status.icon))
                .append(this.status.text).appendTo($("body"));
    },
    setStatus: function(status) {
        this.status = status;
        this.render();
    }
});
