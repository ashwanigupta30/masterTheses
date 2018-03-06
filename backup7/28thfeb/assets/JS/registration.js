//flag to check if the use exists of not;
var newUser = 0;

function validateRegistrationForm() {
	console.log("call validateRegistrationForm()");
	var email = document.getElementById("email").value.toString();
	var username = document.getElementById("username").value.toString();
	var pass1 = document.getElementById("password").value.toString();
	var pass2 = document.getElementById("repassword").value.toString();

	//validate email id;
	if(!validateEmail(email)){
		toastr.error('Please Enter a valid Email Address');
		return false;
	}

	//validate username
	if(username == ""){
		toastr.error("Plase Enter your user name");
		return false;
	}

	//password fields cant be blank
	if(pass1=="" || pass2==""){
		toastr.error('Password field(s) cannot left blank');
		return false;
	}

	//check if the password and re-type password fields are the same;
	if(!(pass1 == pass2)){
		toastr.error('Passwords you Entered don\'t match');
		return false;
	}

	// function which changes the flag variable newUser;
	validateNewUser(email,username);

	// use the flag newUser to check server's response;
	if(newUser == 0){
		toastr.error("User Name / Email is already registered by us");
		return false;
	}

	//dbugin purposes only set to false if dont want to submit form;
	return true;
}

// function to validate email address
function validateEmail(email) 
{
 if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)){
    return true;
  }
  else{
  	return false;
  }
}

function validateNewUser(email,username){
	// sync ajax request to check the database;
	$.ajax({
	    url: '/validateNewUser',
	    async : false,
	    type: 'post',
	    data: {
	    	'email' : email,
	    	'username' : username
	    },
	    success: function(response){
	    	console.log("response is " + response);
			if(response == 'taken' ) {
				newUser = 0;
	      	}
	      	else if(response == 'not_taken') {
	      		newUser = 1;
	      	}
	    }
	});
}