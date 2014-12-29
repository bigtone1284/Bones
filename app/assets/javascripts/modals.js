function makeModals() {

	// makeLogin();
	makeSignUp();

	// logInModal = $('body').find('.logInModal')
	// signUpModal = $('body').find('.signUpModal')
	// userModal = $('body').find('.userModal')

	// logInForm = $('.logIn');
	// logInForm.hide();

	// signUpForm = $('.signUp');
	// signUpForm.hide();

	// userView = $('.user');
	// userView.hide();

}

// function makeLogin(){
// 	var logInDiv = $('.logIn');
	
// 	var exit = $('<div>').attr('id', 'exit');
// 	var userName = $('<input>').attr('id', 'username')
// 														 .attr('type', 'text')
// 														 .val('username');
// 	var password = $('<input>').attr('id', 'password')
// 														 .attr('type', 'password')
// 	var signIn = $('<button>').attr('id', 'signIn')
// 														.text('sign in');

// 	logInDiv.append(userName)
// 					.append(password)
// 					.append(signIn)
// 					.append(exit);
// }

function makeSignUp() {
	var regDiv = $('.signUpForm')

	var exit = $('<div>').attr('id', 'exit');

	var regName = $('<input>').attr('id', 'regName')
														.attr('type', 'text')
														.val('username');
	var regPW = $('<input>').attr('id', 'regPW')
													.attr('type', 'password')

	var regPWcon = $('<input>').attr('id', 'regPWcon')
														 .attr('type', 'password')

	var register = $('<button>').attr('id', 'register')
														.text('register');									

	regDiv.append(regName)
				.append(regPW)
				.append(regPWcon)
				.append(register)
				.append(exit);
}


// function hideModals() {
// 	logInModal.hide();
// 	signUpModal.hide();
// 	userView.hide();
// 	$('.modals').css({ 'z-index': '3', 'opacity': '0' });
// }

// function hideLogInModal() {
// 	logInModal.hide();
// 	$('.logInModal').css({ 'z-index': '3', 'opacity': '0' });
// }

// function hideSignUpModal() {
// 	signUpModal.hide();
// 	$('.signUpModal').css({ 'z-index': '3', 'opacity': '0' });
// }

// function hideUserModal() {
// 	modal3.hide();
// 	$('.userModal').css({ 'z-index': '3', 'opacity': '0' });
// }

// function showLogIn() {
// 	hideSignUpModal();
// 	hideUserModal();
// 	logInModal.empty();
// 	logInForm.show();
// 	logInModal.append(logInForm);
// 	logInModal.show();
// 	$('.modals').css({ 'z-index': '5', 'opacity': '.8' });
// }

// function showSignUp() {
// 	hideLogInModal();
// 	hideUserView();
//  	signUpModal.empty();
//  	signUpModal.append(registerForm);
//  	signUpForm.show();
//  	signUpModal.show();
// 	$('.modals').css({ 'z-index': '3', 'opacity': '.8' });
//  }

//  function showUserView() {
// 	hideLogInModal();
// 	hideSignUpModal();
//  	userModal.empty();
//  	userModal.append(userView);
//  	userView.show();
//  	userModal.show();
// 	$('.modals').css({ 'z-index': '3', 'opacity': '.8' });
//  }

