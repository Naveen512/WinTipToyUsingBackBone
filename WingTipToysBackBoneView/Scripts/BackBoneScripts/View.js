var WingTipToy = WingTipToy || {};

(function (WingTipToy) {

    var View = {};

    View.CategoryView = Backbone.View.extend({
        initialize: function () {
            this.collection = new WingTipToy.CollectionCategory.Category();
            this.CategoryMenu();
        },

        CategoryMenu: function () {
            this.collection.fetch({
                'success': function (data) {
                    $.each(data.toJSON(), function (key, val) {
                        $("btn-group-justified").append('<a href="#" class="btn btn-default">"' + val.CategoryName + '"</a>')
                    });
                },

                'error': function () {

                }
            })
        }

    });

    WingTipToy.ViewCategory = View;

    new WingTipToy.ViewCategory.CategoryView();

})(WingTipToy)