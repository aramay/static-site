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

    function handleResponse(request,
                        responseHandler,
                        isJsonResponse) {

        if ((request.readyState == 4) &&
        (request.status == 200)) {

    // Default to isJsonResponse = true
    if (isJsonResponse === undefined) {
      isJsonResponse = true;
    }

    if (isJsonResponse) {
      responseHandler(JSON.parse(request.responseText));
    }
    else {
      responseHandler(request);
    }
  }
}

    // Expose utility to the global object
    global.$ajaxUtils = ajaxUtils;
    // console.log(global.$ajaxUtils);
    console.log(window.$ajaxUtils);

}) (window);
