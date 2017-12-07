//albinson said it was ok to do this
function setUpVars() {
    hwGradeBox = document.getElementById("hwGrade");
    hwWeightBox = document.getElementById("hwWeight");
    quizGradeBox = document.getElementById("quizGrade");
    quizWeightBox = document.getElementById("quizWeight");
    testGradeBox = document.getElementById("testGrade");
    testWeightBox = document.getElementById("testWeight");
    midtermGradeBox = document.getElementById("midtermGrade");
    midtermWeightBox = document.getElementById("midtermWeight");
    currentGradeDiv = document.getElementById("currentGrade");
    gradeWantedBox = document.getElementById("wantedGrade");
    gradeNeededDiv = document.getElementById("gradeNeeded");
    hwRow = document.getElementById("hwRow");
    quizRow = document.getElementById("quizRow");
    testRow= document.getElementById("testRow");
    midtermRow = document.getElementById("midtermRow");
    rowArray = [hwRow, quizRow, midtermRow, testRow];
}



function calculateGrade() {
    var hwAvg = calculateAverage(convertStringArrayToNumberArray(stringGradesToArray(hwGradeBox.value)));
    var quizAvg = calculateAverage(convertStringArrayToNumberArray(stringGradesToArray(quizGradeBox.value)));
    var midtermAvg = calculateAverage(convertStringArrayToNumberArray(stringGradesToArray(midtermGradeBox.value)));
    var testAvg = calculateAverage(convertStringArrayToNumberArray(stringGradesToArray(testGradeBox.value)));
    var sum = hwAvg * hwWeightBox.value + quizAvg * quizWeightBox.value + midtermAvg * midtermWeightBox.value + testAvg * testWeightBox.value;
    if(checkForErrors([hwWeightBox.value, testWeightBox.value, midtermWeightBox.value, quizWeightBox.value])){
        return;
    }
    var weightSum = parseInt(hwWeightBox.value)+ parseInt(quizWeightBox.value) + parseInt(midtermWeightBox.value) + parseInt(testWeightBox.value);
    if (weightSum >= 100) {
        alert("Your weights cannot add up to or exceed 100");
        return;
    }


    var categoryAverages = [hwAvg, quizAvg, midtermAvg, testAvg];
    if (checkForErrors(categoryAverages)){
        return;
    }
    for(var i = 0; i <categoryAverages.length; i++){
        if(categoryAverages[i] >= 90){
            rowArray[i].style.backgroundColor = "green";
        } else if(categoryAverages[i] < 90 && categoryAverages[i] >= 80) {
            rowArray[i].style.backgroundColor = "limegreen";
        } else if (categoryAverages[i] >= 70 && categoryAverages[i] < 80) {
            rowArray[i].style.backgroundColor = "yellow";
        } else if (categoryAverages[i] < 70 && categoryAverages[i] >= 60){
            rowArray[i].style.backgroundColor = "orange";
        } else if (categoryAverages[i] < 60 && categoryAverages[i] >= 50) {
            rowArray[i].style.backgroundColor = "red";
        }
    }




    currentGradeDiv.innerHTML = "Your current grade is " + (sum/weightSum).toFixed(0) + "%";
    return ([sum/weightSum, weightSum]);
}

function calculateGradeNeeded() {
    if (gradeWantedBox.value.length == 0){
        alert("Enter a value");
        return;
    }
    var gradeWeightArray = calculateGrade();
    var currentGrade = gradeWeightArray[0];
    var weightSum = gradeWeightArray[1];
    var finalWorth = 100 - weightSum;
    var wantedGrade = gradeWantedBox.value;
    var neededGrade = (100 * wantedGrade - currentGrade * weightSum)/finalWorth;
    gradeNeededDiv.innerHTML = "You would need to secure a " + neededGrade.toFixed(0) + "% on the final to achieve a " + wantedGrade + "% in the class";
    if (neededGrade > 100 ) {
        gradeNeededDiv.innerHTML += "<br> Unfortunately you are unable to do so with your current Grade. Better luck next semester!".fontcolor("red");
    }
}

function stringGradesToArray(string) {
    return string.split(",");
}

function convertStringArrayToNumberArray(array) {
    var output = [];
    for(var i = 0; i <array.length; i++){
        output[i] = parseInt(array[i]);
    }
    return output;
}

function calculateAverage(array) {
    var sum = 0;
    for(var i = 0; i < array.length; i++){
        sum += array[i];
    }
    return sum/(array.length)
}


function checkForErrors(arr) {
    for(var i = 0; i < arr.length; i++){
        if (arr[i] < 0){
            alert("No negative value can occur.");
            return true;
        } else if (isNaN(arr[i])) {
            alert("Only numbers allowed");
            return true;
        }

    }
}