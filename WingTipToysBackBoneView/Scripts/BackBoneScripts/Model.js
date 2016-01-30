var WingTipToy = WingTipToy || {};

(function (WingTipToy) {

    var Model = {};

    Model.Category = Backbone.Model.extend({

        initialize: function () {
            console.log("initialization in category Model");
        }
    });

    Model.Product = Backbone.Model.extend({
        initialize: function () {
            console.log("initialize in Product Model");
        },
        url:"http://localhost:4376/api/CategoryProduct/"
    });

    Model.ShopingCart = Backbone.Model.extend({

    });

    WingTipToy.ModelCategory = Model;


})(WingTipToy)