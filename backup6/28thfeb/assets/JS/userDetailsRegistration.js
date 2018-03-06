function getJsonFromUrl() {
  var query = location.search.substr(1);
  var result = {};
  query.split("&").forEach(function(part) {
    var item = part.split("=");
    result[item[0]] = decodeURIComponent(item[1]);
  });
  // console.log(result);
  // return result;
  document.getElementById("objectId").value = result.objectId;
  document.getElementById("userName").value = result.userName;
}
getJsonFromUrl();

function validateUserDetailsForm(){
  var firstName = document.getElementById("firstName").value.toString();
  var lastName = document.getElementById("lastName").value.toString();
  var dateOfBirth = document.getElementById("dateOfBirth").value.toString();

  if(firstName == ""){
    toastr.error("Please Enter your first name");
    return false;
  }
  if(lastName == ""){
    toastr.error("Please Enter your last name");
    return false;
  }
  if(dateOfBirth == ""){
    toastr.error("Please Enter your date of birth");
    return false;
  }
  return true;
}
