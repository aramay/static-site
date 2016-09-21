(function (global){

    var ajaxUtils = {};
// debugger;
    // Returns an HTTP request object
    function getRequestObject(){
        if (window.XMLHttpRequest) {
            return (new XMLHttpRequest());
        }
        else if(window.ActiveObject){
            return (new ActiveObject("Microsoft.XMLHTTP"));
        }
        else{
            global.alert("Ajax is not supported!");
            return(null);
        }
    }

    // Make an ajax request
    ajaxUtils.sendGetRequest = function(requestUrl, responseHandler){

        var request = getRequestObject();

        request.onreadystatechange = function(){
            handleResponse(request, responseHandler);
        };

        request.open("GET", requestUrl, true);
        request.send(null);

    };

    function handleResponse(request, responseHandler) {
        if ((request.readyState == 4) && (request.status == 200)) {
            responseHandler(request);
        }
    }

    // Expose utility to the global object
    // global.$ajaxUtils = ajaxUtils;
    global.$ajaxUtils = ajaxUtils;
    // console.log(ajaxUtils);

}) (window);
