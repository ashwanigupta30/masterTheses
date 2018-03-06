var urlParameters = getJsonFromUrl();
getUserDetails(urlParameters.id,urlParameters.userName);

function getUserDetails(objectId,username){
    $.ajax({
        url: '/getUserDetails',
        // async : false,
        type: 'post',
        data: {
            'id' : objectId,
            'userName' : username
        },
        success: function(response){
            updateView(response);
        }
    });
}

function getJsonFromUrl() {
  var query = location.search.substr(1);
  var result = {};
  query.split("&").forEach(function(part) {
    var item = part.split("=");
    result[item[0]] = decodeURIComponent(item[1]);
  });
  
  return result;
}

function updateView(jsonData){
    console.log(jsonData);
    $("#firstName").html(jsonData.firstName + " ");
    $("#lastName").html(jsonData.lastName);
}