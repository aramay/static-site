$(function (){
    $(".navbar-toggle").blur(function(event){
        var  screenWidth = window.innerWidth;
        if (screenWidth < 768) {
            $("#collapsable-nav").collapse('hide');
        }

    });
});
