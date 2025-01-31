function randomNumber(){
    return Math.floor(Math.random() * range);
}
var yes2 = false;
function isProduct(yes){
    yes2 = yes;
    if(yes){
         zeroOrOne = 1;
    }
    else{
        zeroOrOne = 0;
    }
}
function resetVariables(){
    answer = undefined;
    lastIndex = 0;
    counter2 = 0;
    counter = 0;
    array = [];
    returnSum = 0;
    intervalID = 0;
    ableToInput = false;
    tempCorrect = numberCorrect;
    tempNumOfNums = numOfNums;
    numOfNums = 0;
    numberCorrect = 0;
    isProduct(yes2);
}
function startPressed(){
    document.getElementById("Menu").style.visibility = "hidden";
    document.getElementById("EndScreen").style.visibility = "hidden";
    document.getElementById("Game").style.visibility = "visible";
    document.getElementById("NextLevel").style.visibility = "hidden";
    document.getElementById("levelInfo").style.visibility = "hidden";
    document.getElementById("encouragement").style.visibility = "hidden";
    document.getElementById("score").style.visibility = "hidden";
    init();
}
function reduceTime(){
    deltaTime -= 500;
}
function level3(){

}
function nextLevel(){
    stopDisplay();
    resetVariables();
    document.getElementById("NextText").innerHTML = nextLevelString;
    document.getElementById("NextLevel").style.visibility = "visible";
    document.getElementById("levelInfo").style.visibility = "visible";
    document.getElementById("Game").style.visibility = "hidden";
    document.getElementById("Input").style.visibility = "hidden";
    clearAnswerBox();
}
function end() {
    stopDisplay();
    resetVariables();
    document.getElementById("score").innerHTML = "You have reached" + "<br />" +  "level: " + (level.toString());//occurs after reset variables
    document.getElementById("levelInfo").style.visibility = "hidden";

    document.getElementById("EndScreen").style.visibility = "visible";
    document.getElementById("Game").style.visibility = "hidden";
    document.getElementById("Input").style.visibility = "hidden";
    clearAnswerBox();
    document.getElementById("Answer").style.backgroundColor = "whitesmoke";
    document.getElementById("score").style.visibility = "visible";
}

function stopDisplay() {
    clearInterval(intervalID);
}
function resetPressed(){
    startPressed();
}
function clearEncouragement(){
    document.getElementById("encouragement").style.visibility = "hidden";
    clearInterval(encouragementID);
}
function clearTimeExpired(){
    clearAnswerBox();
    clearInterval(timeExpiredID);
    timeExpiredHasPassed = true;
}
function clearAnswerBox(){
    document.getElementById("Answer").style.backgroundColor = "whitesmoke";
}
var nBack = 2;
var tempCorrect = 0;
var tempNumOfNums = 0;
var array = [];
var counter = 0;
var answer;
var correct;
var answerVerified;
var zeroOrOne = 0;
var sum = zeroOrOne;
var lastIndex = 0;
var counter2 = 0;
var ableToInput;
var timeExpiredHasPassed = false;
var deltaTime = 3000;
var returnSum = 0;
var numberCorrect = 0;
var numOfNums = 0;
var range = 10;
var level = 1;
var intervalID = 0;
var encouragementID = 0;
var timeExpiredID = 0;
var nextLevelString = "Next Level Congratulations!";

function init(){
    isProduct(false);
    sum = zeroOrOne;
    array.push(randomNumber().toString());
    display(array[counter]);
    counter++;
    if(counter !== nBack){
        setTimeout(init,deltaTime);
    }
    else {
        realNumber();
    }
}
function realNumber(){
    document.getElementById("Input").style.visibility = "visible";
    ableToInput = true;
    document.getElementById("Answer").readOnly = false;
    document.getElementById("Answer").focus();

    intervalID = setInterval(displayNewNumber,deltaTime);
}
function displayNewNumber(){
    document.getElementById("Answer").readOnly = false;
    document.getElementById("Answer").focus();

    array.push(randomNumber().toString());
    if(answer === undefined){
        lastIndex++;
        document.getElementById("Answer").style.backgroundColor = "red";
        timeExpiredID = setInterval(clearTimeExpired,400);
        console.log("Incremented from display");
    }
    else{
        clearAnswerBox();
    }

    displayStatements();


}
function displayStatements() {
    display(array[counter]);
    answer = undefined;
    ableToInput = true;
    counter++;
}
function display(string){
    document.getElementById("number").innerHTML = string;
}

function saveAnswer(){

    x = event.keyCode;
    if(x === 13 && ableToInput) {
        answer = document.getElementById("Answer").value;
        answer = Number(answer); /*Converts answer into a number*/
        document.getElementById("Input").reset();
        document.getElementById("Answer").readOnly = true;
        answerVerified = true;
        ableToInput = false;
        checkAnswer();
    }
}
function checkAnswer(){
    sumNumbers();
    var actualAnswer = returnSum;
    console.log(actualAnswer);
   // document.getElementById("encouragement").style.visibility = "visible";

    if (answer === actualAnswer) {
        document.getElementById("Answer").style.backgroundColor = "green";

       // document.getElementById("encouragement").innerHTML = "Great Job!";
        //encouragementID = setInterval(clearEncouragement,1000);
        numberCorrect++;
        numOfNums++;

        console.log("Number of correct " + numberCorrect);
        console.log("Number of nums " + numOfNums);

        correct = true;
    }
    else {
        document.getElementById("Answer").style.backgroundColor = "red";
       // document.getElementById("encouragement").innerHTML = "Try Again";
       // encouragementID = setInterval(clearEncouragement,1000);
        numOfNums++;
        console.log("Number of nums " + numOfNums);
        console.log("Number of correct " + numberCorrect);


        correct = false;
    }
    console.log(correct);
   // if(numOfNums > 1 && numberCorrect > 1){end();}
    if(Math.round(numberCorrect/numOfNums) >= 0.40 && numOfNums > 2 && level >= 1 && level <= 3){
        level++;
        nextLevelString = "Level " + level.toString();
        if(level === 3){
            document.getElementById("levelInfo").innerHTML = "Range!";
            range++;
        }
        else {
            document.getElementById("levelInfo").innerHTML = "Faster!";
            reduceTime();
        }
        nextLevel();//Change the canvas
    }
    else if(level > 3 && level <= 6 && Math.round(numberCorrect/numOfNums) >= 0.60 && numOfNums > 2){
        level++;
        nextLevelString = "Level " + level.toString();
        if(level === 6){
            document.getElementById("levelInfo").innerHTML = "Faster!";
            reduceTime();
        }
        else {
            document.getElementById("levelInfo").innerHTML = "Range!";
            range++;
        }
        nextLevel();
    }
    else if(level > 6 && level <= 8 && Math.round(numberCorrect/numOfNums) >= 0.70 && numOfNums > 5){
        level++;
        nextLevelString = "Level" + level.toString();
        if(level===6){
            document.getElementById("levelInfo").innerHTML = "Faster!";
            reduceTime();
        }
        else {
            document.getElementById("levelInfo").innerHTML = "Range!";
            range++;
        }
        nextLevel();
    }
    else if (level > 8){
        end();
    }
}

function sumNumbers(){
    var realArray = array.map(Number);
    if(zeroOrOne === 0){
        sum = sum += realArray[lastIndex];
    }
    else{
        sum = sum *= realArray[lastIndex]
    }
    console.log("Array " + realArray);
    console.log("sum: " + sum);
    console.log("Index " + lastIndex);

    counter2++;
    if(counter2 === nBack){
        lastIndex = lastIndex + (-nBack + 2);
        console.log("Last last index " + lastIndex);
        counter2 = 0;
        returnSum = sum;
        sum = zeroOrOne;
        return returnSum;
    }
    else{
        lastIndex++;
        sumNumbers();
    }
}
