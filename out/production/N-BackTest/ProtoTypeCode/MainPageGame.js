
function initCanvas() {
    var canvas = document.getElementById("Canvas");
    var ctx = canvas.getContext("2d");
    ctx.font = "30px Arial";
    ctx.fillText("This is an N-Back Test", 150, 50);
    ctx.textAlign = "center";
}
var ableToInput = false;
function randomNumber(){
    return Math.floor(Math.random() * 10);
}
var answer;
var x;
var didAnswer = false;
var answerChecked = false;
function saveAnswer(){

    x = event.keyCode;
    if(x === 13 && ableToInput) {
        answer = document.getElementById("Answer").value;
        answer = Number(answer); /*Converts answer into a number*/
        document.getElementById("Answer").readOnly = true;
        document.getElementById("Input").reset();
        didAnswer = true;
        checkAnswer();
        answerChecked = true;
    }
}
var pastNumber = 0;
var curNumber = 0;
var firstRound = true;
var secondRound = false;
var intervalID;
function displayNumber(){
    if(firstRound) {
        setTimeout(empty,500);
        curNumber = randomNumber();
        document.getElementById("number").innerHTML = curNumber.toString();
        firstRound = false;
        secondRound = true;
        setTimeout(displayNumber,3000);

    }
    else if(secondRound){
        showNewNumber();
        secondRound = false;
        ableToInput = true;
        document.getElementById("Input").style.visibility = "visible";
        setTimeout(displayNumber,4000);
    }
    else{
        showNewNumber();
        if(!answerChecked) {
            console.log("Answerchecked is called");
            document.getElementById("Answer").style.backgroundColor = "red";
            //Use a while statement to totally block execution
            //Using a setTimeout does not totally block execution
            sleep(10000);
            document.getElementById("Answer").style.backgroundColor = "whitesmoke";
            intervalID = setInterval(displayNumber,4000);
            document.getElementById("Answer").style.backgroundColor = "whitesmoke";

        }

        else {
            console.log("set color back to white");
            document.getElementById("Answer").style.backgroundColor = "whitesmoke";
        }
    }

}

function empty() {}
var date = new Date();
var curTime;
function sleep(milli){
    curTime = new Date().getTime();
    console.log("Sleep started");

    for(var i = 0; i < 1e7;i++) {
        if((new Date().getTime() - curTime) > milli){
            break;
        }
    }

    console.log("Sleep ended");
}
function startPressed(){
    document.getElementById("Menu").style.visibility = "hidden";
    document.getElementById("start").style.visibility = "hidden";
    document.getElementById("gameCanvas").style.visibility = "visible";
}
var correct;
function checkAnswer(){
    if (answer === (curNumber + pastNumber)) {
        document.getElementById("Answer").style.backgroundColor = "green";
        correct = true;
    }
    else {
        document.getElementById("Answer").style.backgroundColor = "red";
        correct = false;
    }
    console.log(correct);
}
function showNewNumber() {
    answer = 0;
    pastNumber = curNumber;
    curNumber = randomNumber();
    document.getElementById("number").innerHTML = curNumber.toString();
    document.getElementById("Answer").readOnly = false;
    didAnswer = false;
    answerChecked = false;
}
