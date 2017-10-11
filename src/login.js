var userIsAuthed = false;
var userID;
firebase.auth().onAuthStateChanged(function(authData) {
    if (authData) {
        console.log("User " + authData.uid + " Email: " + authData.email);
        document.getElementById("Email").innerHTML = "Logged in as: " + authData.email;
        userID = authData.uid;//Gets the user ID
    } else {
        console.log("User is logged out");
    }
});
var stringEmail;

function e() {

    var txtEmail = document.getElementById("emailInput").value;
    var password = document.getElementById("password").value;
    var btnLogIn = document.getElementById("btnLogin").value;
    var btnLogOut = document.getElementById("btnLogOut").value;

    var emailVal = txtEmail.toString();
    var passwordVal = password.toString();
    userIsAuthed = true;
    firebase.auth().signInWithEmailAndPassword(emailVal, passwordVal).catch(function error() {
        var errorCode = error.code;
        var errormessage = error.message;
        console.log("Unable to Sign in");
        userIsAuthed = false;
    });
    console.log("Successful");
    document.getElementById("btnLogOut").style.visibility = "visible";
    document.getElementById("btnLogin").style.visibility = "hidden";
    document.getElementById("emailInput").style.visibility = "hidden";
    document.getElementById("password").style.visibility = "hidden";

    // document.getElementById("contain").style.visibility = "hidden";
    displayEmail();

}
function loginWithEnter(){
    var key = event.keyCode;
    if(key === 13){
        e();
    }
}
function signout(){
    //console.log("User is: " + firebase.auth().currentUser.toString());
    firebase.auth().signOut().then(function g() {
        userIsAuthed = false;
    });

    userIsAuthed = false;//Just in case the firebase sign out fails

    document.getElementById("btnLogOut").style.visibility = "hidden";
    document.getElementById("btnLogin").style.visibility = "hidden";
    document.getElementById("emailInput").style.visibility = "hidden";
    document.getElementById("password").style.visibility = "hidden";
}
function displayEmail(){
    document.getElementById("password").style.visibility = "hidden";
    document.getElementById("Email").innerHTML = "Logged in as: " + stringEmail;
}
