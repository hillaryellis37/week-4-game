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

function generateCrystalNumber() {
	var count = 0;
	for (var i = 1; crystalNumberArray.length < 4; i++) {
		var crystalId = $("#crystal" + i);	
		crystalId.attr('value', getRandomIntInclusive(1,12));
		var crystalNum = crystalId.attr('value');
		crystalNumberArray.push(crystalNum);	
	}
}

function generateGameStartNumber() {
	numDOM.attr('value', getRandomIntInclusive(19,120));
	randomNum = numDOM.attr('value');
	numDOM.text(randomNum);
}


function gameStart() {
totalScore = 0;
scoreDOM.text("0");
generateCrystalNumber();
generateGameStartNumber();

}

$(".crystals-grp").on("click", function() {

	
	totalScore = totalScore + parseInt($(this).attr("value"));
   
    scoreDOM.text(totalScore); 

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