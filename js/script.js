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

    var homeHtml = 'js/snippets/home-snippet.html';

    var allCategoryUrl = "https://davids-restaurant.herokuapp.com/categories.json";
    var categoriesTitleHtml = "js/snippets/categories-title-snippet.html";
    var categoryHtml = "js/snippets/categories-snippet.html";

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
  }

    // On page load (before images or CSS)
    document.addEventListener("DOMContentLoaded", function (event) {

    // On first load, show home view
    // showLoading("#main-content");
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


    global.$dc = dc;

})(window);
