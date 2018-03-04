function validateRegistrationForm() {
	console.log("call validateRegistrationForm()");
	var email = document.getElementById("email").value.toString();
	var pass1 = document.getElementById("password").value.toString();
	var pass2 = document.getElementById("repassword").value.toString();

	if(!validateEmail(email)){
		toastr.error('Please Enter a valid Email Address');
		return false;
	}

	//password fields cant be blank
	if(pass1=="" || pass2==""){
		toastr.error('Password field(s) cannot left blank');
		return false;
	}

	//check if the password and re-type password fields are the same;
	if(!(pass1 == pass2)){
		console.log("passwords dont match");
		toastr.error('Passwords you Entered don\'t match');
		return false;
	}
		
	return false;
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