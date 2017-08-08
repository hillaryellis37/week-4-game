var crystalNumberArray = [];

var crystalOne = parseInt(crystalNumberArray[0]);
var crystalTwo = parseInt(crystalNumberArray[1]);
var crystalThree = parseInt(crystalNumberArray[2]);
var crystalFour = parseInt(crystalNumberArray[3]);
var totalScore = 0;
var wins = 0;
var losses = 0;

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
	var numDOM = $("#random_start_number");
	numDOM.attr('value', getRandomIntInclusive(19,120));
	var randomNum = numDOM.attr('value');
	numDOM.text(randomNum);
}

generateCrystalNumber();
generateGameStartNumber();

$(".crystals-grp").on("click", function() {
	var score = $("#total_score");
	
	totalScore = totalScore + parseInt($(this).attr("value"));
   
    score.text(totalScore);


});