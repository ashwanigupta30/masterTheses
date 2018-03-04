
$.ajax({
    url: '/validateNewUser',
    async : false,
    type: 'post',
    data: {
    	'email' : 'email',
    	'username' : 'username'
    },
    success: function(response){
    	console.log("response is " + response);
		if(response == 'taken' ) {
			document.getElementById("testContainer").innerHTML = "ajax recevied";
      	}
      	else if(response == 'not_taken') {
      		console.log("not taken trigired")
      		//return true;
      	}
    }
});

while(true){
	if(document.getElementById("testContainer").innerHTML != "ajax recevied"){
		console.log("waiting for xhtml");
	}
	else{
		break;
	}
}