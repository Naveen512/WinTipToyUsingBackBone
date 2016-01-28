var WingTipToy = WingTipToy || {};

(function (WingTipToy) {

    var Collection = {};

     Collection.Category = Backbone.Collection.extend({

        initialize: function () {

        },
        url: 'http://localhost:4376/api/CategoryProduct/Get/'
    });

     WingTipToy.CollectionCategory = Collection;

})(WingTipToy)