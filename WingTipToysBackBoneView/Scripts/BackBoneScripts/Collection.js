﻿var WingTipToy = WingTipToy || {};

(function (WingTipToy) {

    var Collection = {};

     Collection.Category = Backbone.Collection.extend({

        initialize: function () {
            console.log("initialization in collectin");

        },
        url: "http://localhost:4376/api/CategoryProduct/GetCategoryList/"
     });
     Collection.Product = Backbone.Collection.extend({
         initialize: function () {
             console.log("initialization in Product Collection");
         },
         url: "http://localhost:4376/api/CategoryProduct/GetProductBasedOnCategoryId"
     })

     WingTipToy.CollectionCategory = Collection;

})(WingTipToy)