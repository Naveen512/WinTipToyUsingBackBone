var WingTipToy = WingTipToy || {};

(function (WingTipToy) {

    var View = {};

    View.CategoryView = Backbone.View.extend({
        el: "body",
        events:{
            'click #CategoryTab':'ShowCategoryProducts'
        },
        initialize: function () {
            console.log("View initialization")
            this.collection = new WingTipToy.CollectionCategory.Category();
            this.CategoryMenu();
        },

        CategoryMenu: function () {
            this.collection.fetch({
                'success': function (data) {
                    $.each(data.toJSON(), function (key, val) {
                        $(".btn-group-justified").append("<a href='#' id='CategoryTab' data-val='" + val.CategoryID + "' class='btn btn-default'>" + val.CategoryName + "</a>")
                    });
                },

                'error': function () {
                    console.log("failed to load categories")
                }
            });
        },
        ShowCategoryProducts: function (e) {

        }

    });

    View.ProductView = Backbone.View.extend({
        initialize: function () {
            this.render();
            this.model = new WingTipToy.ModelCategory.Product();
        },
        render: function () {

        },
        ProductDisplayPannel: function (e) {
            var productCartHtml = $.get()
            var id = Number(e.currentTarget.getAttribute('data-val'));
            this.model.url = this.model.url + "?GetProductBasedOnCategoryId=" + id;
            this.model.fetch({
                'success' : function(data){
                    
                }
            });
        }
        
    });

    WingTipToy.ViewCategory = View;

    new WingTipToy.ViewCategory.CategoryView();

})(WingTipToy)