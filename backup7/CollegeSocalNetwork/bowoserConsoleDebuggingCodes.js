
$.ajax({
    url: '/getUserDetails',
    // async : false,
    type: 'post',
    data: {
    	'id' : '5a9cd880104d0c24409d37f6',
    	'userName' : 'profile1'
    },
    success: function(response){
    	console.log("response is ");
      console.log(response);
    }
});

// while(true){
// 	if(document.getElementById("testContainer").innerHTML != "ajax recevied"){
// 		console.log("waiting for xhtml");
// 	}
// 	else{
// 		break;
// 	}
// }