var triviaQ = [
  {
  question: "What is the tallest breed of dog",
  answerOption: ["Irish Wolfhound", "Great Dane", "English Mastiff", "ST. Bernard"],
  answer:0
},
{
  question: "What is the most popular dog breed in the US?",
  answerOption:  ["English Bulldog", "German Shepherd", "Labrador Retriever", "Poodle"],
  answer: 2
},
{
  question: "How many teeth do puppies have?",
  answerOption: ["26", "28","32","42"],
  answer: 1
},
{
  question: "What does corgi mean in Welsh?",
  answerOption: ["Plump Dog", "Short-legged Dog","Cute Dog", "Dwarf Dog"],
  answer: 3
},
{
  question: "What does Shih Tzu mean in Mandarin?",
  answerOption: ["Little Lion", "Long-haired Dog", "Feet Heater", "Tiny Dog"],
  answer: 0
},
{
  question: "Which breed yodels instead of barks?",
  answerOption: ["Azawakh","Basenji","Blood Hound","Basset Hound"],
  answer: 1
},
{
  question: "How many eyelids do dogs have?",
  answerOption: ["0","1","2","3"],
  answer: 3
},
{
  question: "What is a dog's most highly developed sense?",
  answerOption: ["Hearing","Taste","Smell","Sight"],
  answer: 2
},
{
  question: "A 'dog year' is equivalent to how many human years?",
  answerOption: ["5","7","10","15"],
  answer: 3
},
{
  question: "What breed is the only dog that has six toes on each foot?",
  answerOption: ["Norwegian Lundehund","Bolognese","Great Pyrenees","Otterhound"],
  answer: 0
},
{
  question: "Dogs sweat from their _____?",
  answerOption: ["Ears","Paws","Nose","Eyes"],
  answer: 1
},
{
  question: "What breed can reach a speed of up to 45 miles per hour?",
  answerOption: ["Whippet","Saluki","GreyHound","Doberman Pinscher"],
  answer: 2
},
{
  question: "Dogs are about as smart as a ______ old child",
  answerOption: ["6 month","1 yr","2 yr","4 yr"],
  answer: 2
},
{
  question: "What is a group of pugs called?",
  answerOption: ["Groupug","Hug","Puggle","Grumble"],
  answer: 3
}
];



// var gifArray = ['question1', 'question2', 'question3', 'question4', 'question5', 'question6', 'question7', 'question8', 'question9', 'question10', 'question11', 'question12', 'question13','question14','question15'];
var currentQuestion; var correctAnswer; var incorrectAnswer; var unanswered; var seconds; var time; var answered; var userSelect;
var messages = {
	correct: "YOU GOT IT!!",
	incorrect: "WRONG!!",
	endTime: "YOU RAN OUT OF TIME!!",
	finished: "Let's see your result!"
}

$('#startBtn').on('click', function(){
	$(this).hide();
	newGame();
});

$('#startOverBtn').on('click', function(){
	$(this).hide();
	newGame();
});

function newGame(){
	$('#finalMessage').empty();
	$('#correctAnswers').empty();
	$('#incorrectAnswers').empty();
	$('#unanswered').empty();
	currentQuestion = 0;
	correctAnswer = 0;
	incorrectAnswer = 0;
	unanswered = 0;
	newQuestion();
}

function newQuestion(){
	$('#message').empty();
	$('#correctedAnswer').empty();
	// $('#gif').empty();
	answered = true;
	
	//sets up new questions & answerOption
	$('#currentQuestion').html('Question #'+(currentQuestion+1)+'/'+triviaQ.length);
	$('.question').html('<h2>' + triviaQ[currentQuestion].question + '</h2>');
	for(var i = 0; i < 4; i++){
		var choices = $('<div>');
		choices.text(triviaQ[currentQuestion].answerOption[i]);
		choices.attr({'data-index': i });
		choices.addClass('thisChoice');
		$('.answerOption').append(choices);
	}
	countdown();
	//clicking an answer will pause the time and setup answerPage
	$('.thisChoice').on('click',function(){
		userSelect = $(this).data('index');
		clearInterval(time);
		answerPage();
	});
}

function countdown(){
	seconds = 15;
	$('#timeLeft').html('<h3>Time Remaining: ' + seconds + '</h3>');
	answered = true;
	//sets timer to go down
	time = setInterval(showCountdown, 1000);
}

function showCountdown(){
	seconds--;
	$('#timeLeft').html('<h3>Time Remaining: ' + seconds + '</h3>');
	if(seconds < 1){
		clearInterval(time);
		answered = false;
		answerPage();
	}
}

function answerPage(){
	$('#currentQuestion').empty();
	$('.thisChoice').empty(); //Clears question page
	$('.question').empty();

	var rightAnswerText = triviaQ[currentQuestion].answerOption[triviaQ[currentQuestion].answer];
	var rightAnswerIndex = triviaQ[currentQuestion].answer;

	//checks to see correct, incorrect, or unanswered
	if((userSelect == rightAnswerIndex) && (answered == true)){
		correctAnswer++;
		$('#message').html(messages.correct);
	} else if((userSelect != rightAnswerIndex) && (answered == true)){
		incorrectAnswer++;
		$('#message').html(messages.incorrect);
		$('#correctedAnswer').html('The correct answer was: ' + rightAnswerText);
	} else{
		unanswered++;
		$('#message').html(messages.endTime);
		$('#correctedAnswer').html('The correct answer was: ' + rightAnswerText);
		answered = true;
	}
	
	if(currentQuestion == (triviaQ.length-1)){
		setTimeout(scoreboard, 4000)
	} else{
		currentQuestion++;
		setTimeout(newQuestion, 4000);
	}	
}

function scoreboard(){
	$('#timeLeft').empty();
	$('#message').empty();
	$('#correctedAnswer').empty();
	$('#gif').empty();

	$('#finalMessage').html(messages.finished);
	$('#correctAnswers').html("Correct Answers: " + correctAnswer);
	$('#incorrectAnswers').html("Incorrect Answers: " + incorrectAnswer);
	$('#unanswered').html("Unanswered: " + unanswered);
	$('#startOverBtn').addClass('reset');
	$('#startOverBtn').show();
	$('#startOverBtn').html('Start Over?');
}