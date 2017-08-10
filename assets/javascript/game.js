var crystalNumberArray = [];
var totalScore = 0;
var wins = 0;
var losses = 0;
var randomNum = 0;
var numDOM = $("#random_start_number");
var scoreDOM = $("#total_score");
var lossDOM = $("#losses");
var winDOM = $("#wins");

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; 
}

//>>> This function returns true if the letter has already been guessed by the user.
function numberInArray(array, value) {
	var count = 0 
	for (var i = 0; i < array.length; i++) {
		if (array[i] == value) count++;
	}
	if (count === 2) {
		console.log(array);
		array.pop();
		console.log(count===2);
		console.log(array);
		return true;
	}	
	else {
		return false;
		console.log(array);
	}
}


function generateCrystalNumber() {
	var count = 0;
	
	for (var i = 1; crystalNumberArray.length < 4; i++) {
		var crystalId = $("#crystal" + i);	
		crystalId.attr('value', getRandomIntInclusive(1,12));
		var crystalNum = crystalId.attr('value');
		crystalNumberArray.push(crystalNum);
		crystalNum = crystalNumberArray[crystalNumberArray.length - 1];
	
		if (numberInArray(crystalNumberArray, crystalNum)) {
			numberInArray(crystalNumberArray, crystalNum);
			crystalId.attr('value', getRandomIntInclusive(1,12));			
			crystalNum = crystalId.attr('value');
			crystalNumberArray.push(crystalNum);
			crystalNum = crystalNumberArray[crystalNumberArray.length];
		}

		console.log(crystalNumberArray);
	}
}

function generateGameStartNumber() {
	numDOM.attr('value', getRandomIntInclusive(19,120));
	randomNum = numDOM.attr('value');
	// numDOM.text(randomNum);
	var interval = setInterval(frame, 20);
	var numMatch = 0;
	var num = parseInt(randomNum);

	function frame() {	
		if (numMatch === num) {
			clearInterval(interval);
			numDOM.text(num);
		} else {
			numMatch++;
			numDOM.text(numMatch);
		}

	}
}


function gameStart() {
totalScore = 0;
scoreDOM.text("Score: 0");
generateCrystalNumber();
generateGameStartNumber();

}

$(".crystals-grp").on("click", function() {

	
	totalScore = totalScore + parseInt($(this).attr("value"));
   
    scoreDOM.text("Score: " + totalScore); 

    if (totalScore == randomNum) {
    	alert("you win!");
    	wins++;
    	winDOM.text("Wins: " + wins);
    	gameStart();
    }

    if (totalScore > randomNum) {
    	alert("you lose!")
    	losses++;
    	lossDOM.text("Losses: " + losses);
    	gameStart();
    }


});

gameStart();