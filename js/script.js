$(function (){
    $(".navbar-toggle").blur(function(event){
        var  screenWidth = window.innerWidth;
        if (screenWidth < 768) {
            $("#collapsable-nav").collapse('hide');
        }

    });
});

(function(global){



    var dc = {};

    var homeHtml = '../snippets/home-snippet.html';

    var allCategoryUrl = "https://davids-restaurant.herokuapp.com/categories.json";
    var categoriesTitleHtml = "../snippets/categories-title-snippet.html";
    var categoryHtml = "../snippets/categories-snippet.html";

    // convinence function
    var insertHtml = function(html, selector){
        var targetElem = document.querySelector(selector);
        targetElem.innerHtml = html;
    };

    // Return substitute of '{{propName}}'
    // with propValue in given 'string'
    var insertProperty = function (string, propName, propValue) {
    var propToReplace = "{{" + propName + "}}";
    string = string.replace(new RegExp(propToReplace, "g"), propValue);
      return string;
  };

    // On page load (before images or CSS)
    document.addEventListener("DOMContentLoaded", function (event) {

    // On first load, show home view
    // showLoading("#main-content");
    // debugger;

    $ajaxUtils.sendGetRequest(
      homeHtml,
      function (responseText) {
        document.querySelector("#main-content")
          .innerHTML = responseText.response;
      },
      false);
    });

    // Load Menu Categories
    dc.loadMenuCategories = function(){
        $ajaxUtils.sendGetRequest(
            allCategoryUrl,
            buildAndShowCategoriesHTML);
    };

    // Builds HTML for the categories page based on the data
    // from the server
        function buildAndShowCategoriesHTML (categories) {
            // Load title snippet of categories page
            $ajaxUtils.sendGetRequest(
                categoriesTitleHtml,
                function (categoriesTitleHtml) {
                    // Retrieve single category snippet
                    $ajaxUtils.sendGetRequest(
                        categoryHtml,
                        function (categoryHtml) {
                            var categoriesViewHtml =
                            buildCategoriesViewHtml(categories,
                                        categoriesTitleHtml,
                                        categoryHtml);
                                        insertHtml("#main-content", categoriesViewHtml);
                                    },
                                    false);
                                },
                                false);
                            }

                            // Using categories data and snippets html
                        // build categories view HTML to be inserted into page
                        function buildCategoriesViewHtml(categories,
                                                         categoriesTitleHtml,
                                                         categoryHtml) {

                          var finalHtml = categoriesTitleHtml;
                          finalHtml += "<section class='row'>";

                          // Loop over categories
                          for (var i = 0; i < categories.length; i++) {
                            // Insert category values
                            var html = categoryHtml;
                            var name = "" + categories[i].name;
                            var short_name = categories[i].short_name;
                            html =
                              insertProperty(html, "name", name);
                            html =
                              insertProperty(html,
                                             "short_name",
                                             short_name);
                            finalHtml += html;
                          }

                          finalHtml += "</section>";
                          return finalHtml;
                        }

    global.$dc = dc;

}) (window);
