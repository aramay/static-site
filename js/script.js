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

    // convinence function
    var insertHtml = function(html, selector){
        var targetElem = document.querySelector(selector);
        targetElem.innerHtml = html;
    };

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


    global.$dc = dc;

})(window);
