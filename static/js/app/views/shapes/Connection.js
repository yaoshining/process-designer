/**
 * Created by 世宁 on 13-12-18.
 */
define(["raphael-extend"],function(){
    return Backbone.View.extend({
        tagName: "g",
        paper: null,
        from: null,
        to: null,
        raphaelObject: null,
        initialize: function() {

        },
        render: function(){
            var conn = this.paper.connection(this.from.raphaelObject,this.to.raphaelObject,"#000");
            this.raphaelObject = conn;
        },
        draw: function() {
            this.render();
        }
    });
});