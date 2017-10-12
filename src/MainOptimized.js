function randomNumber() {
    //console.log("Rando " + Math.floor(Math.random() * range));
    return Math.floor(Math.random() * range);
}

var yes2 = false;

function isProduct(yes) {
    yes2 = yes;
    if (yes) {
        zeroOrOne = 1;
    }
    else {
        zeroOrOne = 0;
    }
}
function initCanvas(){

}
var maxTime = 30000;
var timerID = 0;
var pastTime = 0;
var timeElapsed = 0;
var timeLeft = maxTime;
function timeUp(){
    clearTimeout(timerID);
    //Show that the training session ended and record the level and other stats
}
function breakTimer(){
    clearTimeout(timerID);
    timeElapsed = Date.now() - pastTime;
    timeLeft -= timeElapsed;
}
function resetVariables() {
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

function back(){
    instructions = false;

    stopDisplay();
    resetVariables();
    document.getElementById("Menu").style.visibility = "visible";
    document.getElementById("EndScreen").style.visibility = "hidden";
    document.getElementById("Game").style.visibility = "hidden";
    document.getElementById("NextLevel").style.visibility = "hidden";
    document.getElementById("levelInfo").style.visibility = "hidden";
    document.getElementById("encouragement").style.visibility = "hidden";
    document.getElementById("score").style.visibility = "hidden";
    document.getElementById("demo").style.visibility = "hidden";
    document.getElementById("solution").style.visibility = "hidden";

    document.getElementById("Input").style.visibility = "hidden";
    counter = 0;
}
function instructionsPressed() {
    instructions = true;
    startPressed();
}

function startPressed() {
    if(userIsAuthed) {
        document.getElementById("btnLogOut").style.visibility = "hidden";
        document.getElementById("btnLogin").style.visibility = "hidden";
        document.getElementById("emailInput").style.visibility = "hidden";
        document.getElementById("password").style.visibility = "hidden";
        document.getElementById("Menu").style.visibility = "hidden";
        document.getElementById("EndScreen").style.visibility = "hidden";
        document.getElementById("Game").style.visibility = "visible";
        document.getElementById("NextLevel").style.visibility = "hidden";
        document.getElementById("levelInfo").style.visibility = "hidden";
        document.getElementById("encouragement").style.visibility = "hidden";
        document.getElementById("score").style.visibility = "hidden";
        document.getElementById("demo").style.visibility = "hidden";
        document.getElementById("solution").style.visibility = "hidden";

        counter = 0;
        timerID = setTimeout(timeUp,timeLeft);
        pastTime = Date.now();
        init();
    }
    else{
        console.log("Not authorized");
        document.getElementById("N-BackTitle").style.visibility = "hidden";
        document.getElementById("LoginError").style.visibility = "visible";

    }
}

function reduceTime() {
    deltaTime -= 500;
}

function resetTime() {
    deltaTime = initialDeltaTime;
}

function resetRange() {
    range = initialRange;
}

function nextLevel() {
    stopDisplay();
    resetVariables();

    document.getElementById("NextText").innerHTML = nextLevelString;
    document.getElementById("NextLevel").style.visibility = "visible";
    document.getElementById("levelInfo").style.visibility = "visible";
    document.getElementById("Game").style.visibility = "hidden";
    document.getElementById("Input").style.visibility = "hidden";
    document.getElementById("demo").style.visibility = "hidden";
    document.getElementById("DescriptionDemo").style.visibility = "hidden";
    clearAnswerBox();
    isitnextLevel = true;

    breakTimer();

}

function end() {
    stopDisplay();
    resetVariables();
    document.getElementById("score").innerHTML = "You have reached" + "<br />" + "level: " + (level.toString()) + "<br />" +
        "Congrats!";//occurs after reset variables
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

function resetPressed() {
    back();
}

function clearEncouragement() {
    document.getElementById("encouragement").style.visibility = "hidden";
    clearInterval(encouragementID);
}

function clearTimeExpired() {
    clearAnswerBox();
    clearInterval(timeExpiredID);
    timeExpiredHasPassed = true;
}

function clearAnswerBox() {
    document.getElementById("Answer").style.backgroundColor = "whitesmoke";
}

var nBack = 2;
var instructions = false;//This must init to false!!!!!!
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
var initialDeltaTime = 3000;
var deltaTime = initialDeltaTime;
var returnSum = 0;
var numberCorrect = 0;
var numOfNums = 0;
var initialRange = 10;
var range = initialRange;
var level = 1;
var intervalID = 0;
var encouragementID = 0;
var timeExpiredID = 0;
var nextLevelString = "Next Level Congratulations!";
var isitnextLevel = false;


if(timeLeft < 0){
    console.log("Time Left Ended " + timeLeft);
    timeUp();
}
function init() {
    isProduct(false);//Set this to true to get multiplication or in level, change yes2
    sum = zeroOrOne;
    array.push(randomNumber().toString());
    //console.log("counter " + counter);

    //console.log("randomNum " + array[counter]);
    display(array[counter]);

    counter++;
    if (counter !== nBack) {
        setTimeout(init, deltaTime);
    }
    else {
        realNumber();
    }
}

function realNumber() {
    document.getElementById("Input").style.visibility = "visible";
    if(!instructions) {
        ableToInput = true;
        document.getElementById("Answer").readOnly = false;
        document.getElementById("Answer").focus();
    }
    if (instructions) {
        checkAnswer();
        moveText();
        document.getElementById("solution").innerHTML = array[lastIndex - 1] + " + " + array[lastIndex] + " = ";
        document.getElementById("demo").innerHTML = returnSum.toString();
        document.getElementById("demo").style.visibility = "visible";
        document.getElementById("solution").style.visibility = "visible";
        document.getElementById("DescriptionDemo").style.visibility = "visible";

    }
    intervalID = setInterval(displayNewNumber, deltaTime);
}

function displayNewNumber() {
    if(!instructions) {
        document.getElementById("Answer").readOnly = false;
        document.getElementById("Answer").focus();
    }

    array.push(randomNumber().toString());
    if (instructions) {
        checkAnswer();
        moveText();
        document.getElementById("solution").innerHTML = array[lastIndex - 1] + " + " + array[lastIndex] + " = ";
        document.getElementById("demo").innerHTML = returnSum.toString();
        document.getElementById("demo").style.visibility = "visible";
        document.getElementById("solution").style.visibility = "visible";

    }
    if (answer === undefined && !instructions) {
        lastIndex++;
        if (!instructions) {
            document.getElementById("Answer").style.backgroundColor = "red";
        }
        timeExpiredID = setInterval(clearTimeExpired, 400);
        console.log("No answer found");
    }
    else {
        clearAnswerBox();
    }

    displayStatements();
    timeElapsed = Date.now() - pastTime;
    timeLeft -= timeElapsed;
    pastTime = Date.now();

}

function displayStatements() {
    display(array[counter]);
    if (!instructions) {
        answer = undefined;
    }
    ableToInput = true;
    counter++;
}

function display(string) {
    document.getElementById("number").innerHTML = string;
}
function bIsPressed(){//Currently Unused
    var code = event.keyCode;
    if(code === 66 && instructions){
        back();
    }
}
function saveAnswer() {
    x = event.keyCode;
    if (x === 13 && ableToInput && !instructions) {
        answer = document.getElementById("Answer").value;
        answer = Number(answer);
        /*Converts answer into a number*/
        document.getElementById("Input").reset();
        document.getElementById("Answer").readOnly = true;
        answerVerified = true;
        ableToInput = false;
        checkAnswer();
    }
}

function checkAnswer() {
    sumNumbers();
    var actualAnswer = returnSum;
    //console.log(actualAnswer);
    // document.getElementById("encouragement").style.visibility = "visible";

    if (answer === actualAnswer || instructions) {
        if (!instructions) {
            document.getElementById("Answer").style.backgroundColor = "green";
        }

        // document.getElementById("encouragement").innerHTML = "Great Job!";
        //encouragementID = setInterval(clearEncouragement,1000);
        numberCorrect++;
        numOfNums++;

        //console.log("Number of correct " + numberCorrect);
        //console.log("Number of nums " + numOfNums);

        correct = true;
    }
    else {
        if (!instructions) {
            document.getElementById("Answer").style.backgroundColor = "red";
        }
        // document.getElementById("encouragement").innerHTML = "Try Again";
        // encouragementID = setInterval(clearEncouragement,1000);
        numOfNums++;
        //console.log("Number of nums " + numOfNums);
        //console.log("Number of correct " + numberCorrect);


        correct = false;
    }


    //console.log(correct);
    // if(numOfNums > 1 && numberCorrect > 1){end();}
    isitnextLevel = false;
    if (Math.round(numberCorrect / numOfNums) >= 0.70 && numOfNums > 5 && level >= 1 && level <= 3 && correct) {
        level++;
        if (level === 3) {
            document.getElementById("levelInfo").innerHTML = "Range!";
            range++;
        }
        else {
            document.getElementById("levelInfo").innerHTML = "Faster!";
            reduceTime();
        }
        nextLevelString = "Level " + level.toString();
        nextLevel();//Change the canvas
    }
    else if (level > 3 && level <= 6 && Math.round(numberCorrect / numOfNums) >= 0.70 && numOfNums > 5 && correct) {
        level++;
        nextLevelString = "Level " + level.toString();
        if (level === 6) {
            document.getElementById("levelInfo").innerHTML = "Faster!";
            reduceTime();
        }
        else {
            document.getElementById("levelInfo").innerHTML = "Range!";
            range++;
        }
        nextLevel();
    }
    else if (level > 6 && level < 8 && Math.round(numberCorrect / numOfNums) >= 0.70 && numOfNums > 5 && correct) {
        level++;
        nextLevelString = "Level " + level.toString();
        if (level === 6) {
            document.getElementById("levelInfo").innerHTML = "Faster!";
            reduceTime();
        }
        else {
            document.getElementById("levelInfo").innerHTML = "Range!";
            range++;
        }
        nextLevel();
    }
    else if (level === 8 && Math.round(numberCorrect / numOfNums) >= 0.80 && numOfNums > 10 && correct) {
        level++;
        nextLevelString = "Level " + level.toString();
        document.getElementById("levelInfo").style.fontSize = "25px";
        document.getElementById("levelInfo").style.fontWeight = "strong";
        document.getElementById("levelInfo").innerHTML = "Increased Potatoes! Now you have to memorize the last two numbers and add the current";

        document.getElementById("levelInfo").style.fontSize = "75px";
        document.getElementById("levelInfo").style.fontWeight = "normal";

        nBack++;
        resetTime();
        resetRange();
        nextLevel();
    }
    if (Math.round(numberCorrect / numOfNums) >= 0.70 && numOfNums > 6 && level > 8 && level <= 11 && correct) {
        level++;
        if (level === 11) {
            document.getElementById("levelInfo").innerHTML = "Range!";
            reduceTime();
        }
        else {
            document.getElementById("levelInfo").innerHTML = "Faster!";
            range++;
        }
        nextLevelString = "Level " + level.toString();
        nextLevel();//Change the canvas
    }
    else if (level > 11 && correct) {
        end();
    }
    if(!instructions) {//Don't write scores from demo
        writeUserLevel(userID, level);
    }
}
function writeUserLevel(userID, levelCur){
    firebase.database().ref('users/' + userID).set({
       levelCur: levelCur
    });
}
function sumNumbers() {
    var realArray = array.map(Number);
    if (zeroOrOne === 0) {
        sum = sum += realArray[lastIndex];
    }
    else {
        sum = sum *= realArray[lastIndex]
    }
    //console.log("Array " + realArray);
    //console.log("sum: " + sum);
    //console.log("Index " + lastIndex);

    counter2++;
    if (counter2 === nBack) {
        lastIndex = lastIndex + (-nBack + 2);
        //console.log("Last last index " + lastIndex);
        counter2 = 0;
        returnSum = sum;
        //console.log("RETURN SUM " + returnSum);
        sum = zeroOrOne;
        return returnSum;
    }
    else {
        lastIndex++;
        sumNumbers();
    }
}

function moveText() {
    if (returnSum >= 10) {
        document.getElementById("demo").style.left = "39.2%";
    }
}
