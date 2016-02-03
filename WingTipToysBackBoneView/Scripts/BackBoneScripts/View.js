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
            'click #deleteItem': 'deleteShopingCartItem',
            'click #confirmDelete': 'confirmDeletemethod',
            'click #editTemplate': 'editShopingCartItem',
            'click .glyphicon-plus,.glyphicon-minus': 'changeQunatity',
            'click #confirmEdit': 'confirmEditMethod'
        },
        DisplayShopingChart: function (e,type) {
            if (type)
            {
                //nothing to do here
            }
            else{
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
            if (!type) {

            $("tr[data-val='" + model.attributes.ProductID + "']").addClass('success');
            }
        },
        
        deleteShopingCartItem: function (e) {
            var id = Number(e.currentTarget.closest('tr').children[1].innerHTML);
            //e.currentTarget.closest('tr').remove();

            //this.collection.findWhere({ ProductID: id }).remove();
            var modelToDelete = this.collection.findWhere({ ProductID: id });
            var templateName = "http://localhost:5342/Templates/DeleteModelPopup.html";
            $.ajax({
                type: 'GET',
                url: templateName,
                async: false,
                'success': function (response) {
                    $(".modal-content").html('');
                    $(".modal-content").append(response);  
                }
            });

            $("#ModalProductID").text(modelToDelete.get('ProductID'));
            $("#ModalName").text(modelToDelete.get('Name'));
            $("#ModalPrice").text(modelToDelete.get('Price'));
            $("#ModelQuality").text(modelToDelete.get('Quality'));
            $("#ModalItemTotal").text(modelToDelete.get('ItemTotal'));
            $(".bs-example-modal-lg").modal('show');
            //this.collection.remove(modelToDelete);
            //this.DisplayShopingChart('',"deleteShopingCartItem");
        },
        confirmDeletemethod: function () {
            var modelToDelete = this.collection.findWhere({ ProductID: Number($("#ModalProductID").text()) });
           this.collection.remove(modelToDelete);
           this.DisplayShopingChart('', "deleteShopingCartItem");
           $(".bs-example-modal-lg").modal('hide');
           $(".modal-content").html('');
        },
        editShopingCartItem: function (e) {
            var id = Number(e.currentTarget.closest('tr').children[1].innerHTML);
            var modelToEdit = this.collection.findWhere({ ProductID: id });
            var templateName = "http://localhost:5342/Templates/EditModelPopUp.html";
            $.ajax({
                type: 'GET',
                url: templateName,
                async: false,
                'success': function (response) {
                    $(".modal-content").html('');
                    $(".modal-content").append(response);
                }
            });

            $("#ModalProductID").val(modelToEdit.get('ProductID'));
            $("#ModalName").val(modelToEdit.get('Name'));
            $("#ModalPrice").val(modelToEdit.get('Price'));
            $("#ModelQuality").val(modelToEdit.get('Quality'));
            $("#ModalItemTotal").val(modelToEdit.get('ItemTotal'));
            $(".bs-example-modal-lg").modal('show');
        },
        changeQunatity: function (e) {
            console.log();
            if(e.currentTarget.classList.contains('glyphicon-plus'))
            {
                if(Number($("#ModelQuality").val())>=1)
                {
                    $("#ModelQuality").val(Number($("#ModelQuality").val()) + 1);
                }
            }
            else if (e.currentTarget.classList.contains('glyphicon-minus')) {
                if (Number($("#ModelQuality").val()) > 1) {
                    $("#ModelQuality").val(Number($("#ModelQuality").val()) - 1);
                }
            }
        },
        confirmEditMethod: function () {
            var id = Number($("#ModalProductID").val());
            var editMethod = this.collection.findWhere({ ProductID: id });
            editMethod.set('Quality', $("#ModelQuality").val());

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
            $(".bs-example-modal-lg").modal('hide');
            $(".modal-content").html('');
        }
        
    });

    WingTipToy.ViewCategory = View;

    new WingTipToy.ViewCategory.ProductView();
    new WingTipToy.ViewCategory.ShopingCart();

})(WingTipToy)