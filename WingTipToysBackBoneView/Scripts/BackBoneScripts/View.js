/// <reference path="C:\DotNet Practise\wingTipToyBackbone\WinTipToyUsingBackBone\WingTipToysBackBoneView\Templates/ProductCard.html" />
/// <reference path="C:\DotNet Practise\wingTipToyBackbone\WinTipToyUsingBackBone\WingTipToysBackBoneView\Templates/ProductCard.html" />
/// <reference path="C:\DotNet Practise\wingTipToyBackbone\WinTipToyUsingBackBone\WingTipToysBackBoneView\Templates/ProductCard.html" />
var WingTipToy = WingTipToy || {};

(function (WingTipToy) {

    var View = {};
    var shopID = 0;
    View.CategoryView = Backbone.View.extend({
        el: "body",
       
        initialize: function () {
            console.log("View initialization")
           
            //this.CategoryMenu();
        },

        CategoryMenu: function () {
            this.collection = new WingTipToy.CollectionCategory.Category();
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
        //ShowCategoryProducts: function (e) {
        //    var e = e;
        //    var self = this;
        //    new View.ProductView();

        //}

    });

    View.ProductView = View.CategoryView.extend({
        initialize: function () {
            console.log("production view");
            this.CategoryMenu();
            this.render();
           
            //this.LoadTemplate();
            //this.ProductDisplayPannel();
        },
        events: {
            'click #CategoryTab': 'ProductDisplayPannel',
            'click #imgID':'SingleProductDisplayPannel'
        },
        render: function () {

        },
        ProductDisplayPannel: function (e) {
            this.collection = new WingTipToy.CollectionCategory.Product();
            var templateName = "http://localhost:5342/Templates/ProductCard.html";
            $('#teplateParentHolder').html('');
            $.get(templateName, function (response) {

                $('#teplateParentHolder').append(response);
            });
            //this.LoadTemplate(templateName);
            var id = Number(e.currentTarget.getAttribute('data-val'));
            this.collection.url = this.collection.url + "?categoryID=" + id;
            this.collection.fetch({
                'success' : function(data){
                    var source = $("#productCardTemplate").html();
                    var template = Handlebars.compile(source);
                    var outPutHtml = template({ category: data.toJSON() });
                    $("#templateSuperParentHolder").html('');
                    $("#templateSuperParentHolder").append(outPutHtml);
                }
            });
        },
        //LoadTemplate: function (fileName) {
        //    $('#teplateParentHolder').html('');
        //    $.get(fileName, function (response) {
               
        //        $('#teplateParentHolder').append(response);
        //    });
        //},
        SingleProductDisplayPannel: function (e) {
            this.model = new WingTipToy.ModelCategory.Product();
            var templateName = "http://localhost:5342/Templates/SingleProductCard.html";
            $('#teplateParentHolder').html('');
            $.get(templateName, function (response) {

                $('#teplateParentHolder').append(response);
            });
            //this.LoadTemplate(templateName);
            var id = Number(e.currentTarget.getAttribute('data-val'));

            this.model.url = this.model.url + "GetSingleProduct?productID=" + id;

            this.model.fetch({
                'success': function (data) {
                    var source = $("#singleProductCard").html();
                    var template = Handlebars.compile(source);
                    var outPutTemptlate = template({ singleProduct: data.toJSON() });
                    $("#templateSuperParentHolder").html('');
                    $("#templateSuperParentHolder").append(outPutTemptlate);
                },
                'error': function () {
                    console.log("Get a single Product is failed");
                }
            })
        }
        
    });

    View.ShopingCart = Backbone.View.extend({
        el: "body",
        //tagName:"div",
        initialize: function () {
            //this.el = $("#view2")
            console.log("shoping cart initilizer");
            this.collection =new WingTipToy.CollectionCategory.ShopingCart();
        },
        events:{
            'click #addToCart': 'DisplayShopingChart',
        },
        DisplayShopingChart: function () {
            var model;
            var quan = this.collection.where({ Name: $('.media-left h3').text() }).length;
            if (quan === 1) {
                updateModel = this.collection.findWhere({ Name: $('.media-left h3').text() });
                this.collection.remove(updateModel);
                 model = new WingTipToy.ModelCategory.ShopingCart({
                    ProductID: updateModel.attributes.ProductID,
                    Name: updateModel.attributes.Name,
                    Price: updateModel.attributes.Price,
                    Quality: updateModel.attributes.Quality + 1,
                    ItemTotal: (updateModel.attributes.Quality + 1) * updateModel.attributes.Price,

                });
                this.collection.add(model);
            }
            else {

                //shopID = shopID + 1;
                 model = new WingTipToy.ModelCategory.ShopingCart({
                    ProductID:Number($('.media-body span')[1].innerHTML),
                    Name: $('.media-left h3').text(),
                    Price: $('.media-body span')[0].innerHTML,
                    Quality: quan == 0 ? 1 : quan,
                    ItemTotal: (quan == 0 ? 1 : quan) * Number($('.media-body span')[0].innerHTML),
                });

                this.collection.add(model);
            }
            //this.collection.comparator = "ID";
            var templateName = "http://localhost:5342/Templates/ShopingCart.html";
            $('#teplateParentHolder').html('');
            //$.get(templateName, function (response) {

            //    $('#teplateParentHolder').append(response);
            //});
            $.ajax({
                type: 'GET',
                url: templateName,
                async: false,
                'success': function (response) {
                    $('#teplateParentHolder').append(response);
                }
            })
            var source = $('#ShpotingCartTemplate').html();
            var template = Handlebars.compile(source);
            var outputHtml = template({ ShopingCart: this.collection.toJSON() });
            $("#templateSuperParentHolder").html('');
            $("#templateSuperParentHolder").append(outputHtml);
            $("tr[data-val='" + model.attributes.ProductID + "']").addClass('success');
        },
        
    });

    WingTipToy.ViewCategory = View;

    new WingTipToy.ViewCategory.ProductView();
    new WingTipToy.ViewCategory.ShopingCart();

})(WingTipToy)