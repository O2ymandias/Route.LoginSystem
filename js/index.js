"use strict";

/////////////////////////////////////////////////////////////////////
//-----------------------------Generic-----------------------------//
////////////////////////////////////////////////////////////////////
let user = null;

// Sign Up
const signUpNameInp = document.querySelector("#signUpName");
const nameVal = document.querySelector("#nameVal");
const signUpEmailInp = document.querySelector("#signUpEmail");
const emailVal = document.querySelector("#emailVal");
const signUpPasswordInp = document.querySelector("#signUpPassword");
const passwordVal = document.querySelector("#passwordVal");
const btnSignUp = document.querySelector("#btnSignUp");
const signUpErrorMsg = document.querySelector("#signUpErrorMsg");

// Login
const loginEmailInp = document.querySelector("#loginEmail");
const loginPasswordInp = document.querySelector("#loginPassword");
const btnLogin = document.querySelector("#btnLogin");
const loginErrorMsg = document.querySelector("#loginErrorMsg");

// Navigation
const signUpSec = document.querySelector("#signUp");
const loginSec = document.querySelector("#login");
const homeSec = document.querySelector("#home");

function goToLogin() {
	signUpSec.classList.remove("d-block");
	signUpSec.classList.add("d-none");

	homeSec.classList.remove("d-block");
	homeSec.classList.add("d-none");

	loginSec.classList.remove("d-none");
	loginSec.classList.add("d-block");

	document.title = "Login";

	loginEmailInp.value = null;
	loginPasswordInp.value = null;

	loginErrorMsg.classList.add("d-none");
}

function goToHome() {
	signUpSec.classList.remove("d-block");
	signUpSec.classList.add("d-none");

	loginSec.classList.remove("d-block");
	loginSec.classList.add("d-none");

	homeSec.classList.remove("d-none");
	homeSec.classList.add("d-block");

	document.querySelector("#home h1 span").textContent = user.name;

	document.title = "Home";
}

function goToSignUp() {
	homeSec.classList.remove("d-block");
	homeSec.classList.add("d-none");

	loginSec.classList.remove("d-block");
	loginSec.classList.add("d-none");

	signUpSec.classList.remove("d-none");
	signUpSec.classList.add("d-block");

	document.title = "Sign Up";

	signUpNameInp.value = null;
	signUpEmailInp.value = null;
	signUpPasswordInp.value = null;

	nameVal.classList.add("d-none");
	emailVal.classList.add("d-none");
	passwordVal.classList.add("d-none");

	signUpErrorMsg.classList.add("d-none");
}

function init() {
	if (localStorage.getItem("user")) {
		user = JSON.parse(localStorage.getItem("user"));
		if (user.isSignedIn) goToHome();
		else goToLogin();
	} else goToLogin();

	document.querySelector("#btnLogout").addEventListener("click", function () {
		goToLogin();
		user.isSignedIn = false;
		UpdateLocalStorage();
	});
}

function UpdateLocalStorage() {
	localStorage.setItem("user", JSON.stringify(user));
}

init();

//////////////////////////////////////////////////////////////////////
//--------------------------Sign Up Module--------------------------//
/////////////////////////////////////////////////////////////////////

// Name Validation
function validateName() {
	const name = signUpNameInp.value;
	const regex = /^[A-Z](?:\w|(?<=\w)\s){2,49}$/;

	nameVal.classList.replace("d-none", "d-inline");

	if (regex.test(name)) {
		nameVal.textContent = "Looks good!";
		nameVal.classList.replace("text-danger", "text-success");
		return true;
	} else {
		nameVal.textContent =
			"Name must start with a capital letter, contains at least 3 characters and a maximum of 50.";
		nameVal.classList.replace("text-success", "text-danger");
		return false;
	}
}
signUpNameInp.addEventListener("change", validateName);

// Email Validation
function validateEmail() {
	const email = signUpEmailInp.value;
	const regex =
		/^[a-zA-Z]{3,50}\d{0,10}(?:\.[a-zA-Z]{1,50}\d{0,10}){0,4}@(?:gmail|outlook|yahoo)\.com$/;

	emailVal.classList.replace("d-none", "d-inline");

	if (regex.test(email)) {
		emailVal.textContent = "Looks good!";
		emailVal.classList.replace("text-danger", "text-success");
		return true;
	} else {
		emailVal.textContent = "Invalid email address.";
		emailVal.classList.replace("text-success", "text-danger");
		return false;
	}
}
signUpEmailInp.addEventListener("change", validateEmail);

// Password Validation
function validatePassword() {
	const password = signUpPasswordInp.value;
	const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[^\s]{8,50}$/;

	passwordVal.classList.replace("d-none", "d-inline");

	if (regex.test(password)) {
		passwordVal.textContent = "Looks good!";
		passwordVal.classList.replace("text-danger", "text-success");
		return true;
	} else {
		passwordVal.textContent =
			"Password must contain at least 8 characters, one lowercase letter, one uppercase letter, one number, one special character, and no spaces.";
		passwordVal.classList.replace("text-success", "text-danger");
		return false;
	}
}
signUpPasswordInp.addEventListener("change", validatePassword);

// Signing Up
btnSignUp.addEventListener("click", function (event) {
	event.preventDefault();
	if (validateName() && validateEmail() && validatePassword()) {
		signUp();
	}
});
function signUp() {
	const newUser = {
		name: signUpNameInp.value,
		email: signUpEmailInp.value,
		password: signUpPasswordInp.value,
		isSignedIn: false,
	};
	if (user?.email === newUser.email) {
		signUpErrorMsg.classList.remove("d-none");
		signUpErrorMsg.textContent = "User already exists.";
	} else {
		user = newUser;
		UpdateLocalStorage();
		goToLogin();
		signUpErrorMsg.classList.add("d-none");
	}
}

// Navigating
document
	.querySelector("#loginLink")
	.addEventListener("click", function (event) {
		event.preventDefault();
		goToLogin();
	});

//////////////////////////////////////////////////////////////////////
//---------------------------Login Module---------------------------//
/////////////////////////////////////////////////////////////////////

btnLogin.addEventListener("click", function (event) {
	event.preventDefault();
	if (
		user &&
		loginEmailInp.value === user.email &&
		loginPasswordInp.value === user.password
	) {
		goToHome();
		user.isSignedIn = true;
		UpdateLocalStorage();
		loginErrorMsg.classList.add("d-none");
	} else {
		loginErrorMsg.classList.remove("d-none");
		loginErrorMsg.textContent = "Invalid email or password.";
	}
});

// Navigating
document
	.querySelector("#signUpLink")
	.addEventListener("click", function (event) {
		event.preventDefault();
		goToSignUp();
	});
