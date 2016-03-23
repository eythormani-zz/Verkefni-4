//Wouldn't it be cooler to load these in from a JSON file?
//Liður eitt
var q1 = new Question("Who is the president of the United States?", ["John Wilkes Booth", "Frank Underwood", "Barrack Obama", "No one, the POTUS is a puppet controlled by the shadow government"], 2);
var q2 = new Question("Can a match box?", ["Yes", "No", "No, but a tin can", "Yes, one beat Mike Tyson"], 2);
var q3 = new Question("How many holes in a polo", ["One", "Two", "Three", "Four"], 3);
var q4 = new Question(".sdrawkcab noitseuq siht rewsnA", ["K.O", "What?", "I don't understand", "Tennis elbow"], 0);
var q5 = new Question("What sound does a bell make?", ["Whoop", "F'taang", "Froon", "Blip-blop-bloop-banga-o-langa-woof, nubby-frrph 120,000 eckleck-ooo-looo-a-scap-babble-de booble wop."], 1);
var q6 = new Question("What is the 7th letter of the alphabet?", ["G", "H", "I", "J"], 1);
//make an array from the questions
var questionArray = [q1, q2, q3, q4, q5, q6];//Liður eitt
//Shuffle the array
shuffle(questionArray);
//declare the global variables
var currentIndex = 0;
var correctAnswers = [];
var incorrectAnswers = [];


//starts the game
loadQuestion(questionArray[currentIndex]);


//The loadquestion function, this takes in a question object as a parameter and loads the data from the object into the DOM
//Liður þrjú
function loadQuestion(a) {
	//insert the actual question into the appropriate html element
	$("#question").text(a.question);
	//empty the answercontainer in case there is already something in there
	$("#answerContainer").empty();
	//append the possible answers to the questions to the recently emptied answerContainer
	for (var i = 0; i < a.answers.length; i++) {
		//add each question to the container
		$("#answerContainer").append("<div class='answer bg-info'>" + a.answers[i] + "</div>");
	}
	//run the addclickevents function to add the click events for the possible answers
	addClickEvents();
	//add the index of the correct question as text into a hidden html element, I am well aware that this is not best practice
	$("#correctAnswer").text(a.correct);
}
//This is a function that takes care of adding click events onto the possible answers. 
function addClickEvents() {
	//Call an internal function for each answer element
	$('.answer').click(function(event) {
		//get the index of the selected question(in context to it's order from the parent element, answerContainer)
		var selected = $(this).index();
		//get the actual correct answer
		var correct = $("#correctAnswer").text();
		//if the selected question is the correct one
		if (selected == correct) {
			//add the index of the current question to the correctAnswers array
			correctAnswers.push(currentIndex);
			//if the user just answered the last question, display the end screen
			if (currentIndex == questionArray.length -1) {
				showCorrect(correct);
				alert("Rétt svar! (" + correctAnswers.length + '/' + questionArray.length + ")");
				loadEnd();
			}
			//if this is not the last question
			else{
				//increment the index of the current question
				currentIndex++;
				//load the new question into the DOM
				showCorrect(correct);
				alert("Rétt svar! (" + correctAnswers.length + '/' + questionArray.length + ")");
				loadQuestion(questionArray[currentIndex]);
			}
		}
		//if the user clicked an incorrect question
		else{
			//add the incorrect question into the incorrect array
			incorrectAnswers.push(currentIndex);
			//if the user just answered the last question, display the end screen
			if (currentIndex == questionArray.length -1) {
				showCorrect(correct);
				alert("Rétt svar! (" + correctAnswers.length + '/' + questionArray.length + ")");
				loadEnd();
			}
			//if the question is not the last question
			else{
				//increment the index of the question array
				currentIndex++;
				showCorrect(correct);
				alert("Rangt svar! (" + correctAnswers.length + '/' + questionArray.length + ")");
				//display the next question in line
				loadQuestion(questionArray[currentIndex]);
			}
		}
	});
}
//This function takes an array as a parameter and proceeds to shuffle it, using the Fisher-Yates shuffle
//Liður tvö
function shuffle(array) {
    var index = array.length, temporaryValue, randomIndex;
    //this should probably be done recursively
    while (0 !== index) {
        randomIndex = Math.floor(Math.random() * index);
        index -= 1;
        temporaryValue = array[index];
        array[index] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

  return array;
}
function showCorrect(correctIndex) {
	$(".answer").each(function() {
		$(this).removeClass('bg-info');
		if ($(this).index() == correctIndex) {
			$(this).addClass('bg-success');
		}else{
			$(this).addClass('bg-danger');
		}
	});
	$(this).removeClass(':hover');
}
//this function restarts the quiz by simply resetting the values of the global variables and re-shuffling the questionarray
//Liður sex
function restart() {
	//reset the global variables
	currentIndex=0;
	correctAnswers = [];
	incorrectAnswers = [];
	//reshuffle the array
	shuffle(questionArray);
	//load the first question in the shuffled array
	loadQuestion(questionArray[currentIndex]);
}
//this function loads the end-game screen which displays the users score and offers him to restart the game
//Liður sex
function loadEnd() {
	//change the text in the question element
	$("#question").text("Niðurstöður");
	//remove all the child elements from the answer container
	$("#answerContainer").empty();
	//append new stuff to the answerContainer
	$("#answerContainer").html('<div class="endScreen">' + correctAnswers.length + '/' + questionArray.length + '<div class="score"></div><div id="restart">	&#8634;</div></div>');
	//add a click function onto the restart button
	$("#restart").click(function(event) {
		restart();
	});
}
//Object construcor for the questions
//Liður eitt
function Question(a, b, c) {
	this.question = a;
	this.answers = b;
	this.correct = c;
}
//Timer on the questions
var counter = 10;
setInterval(function () {
	if (currentIndex != questionArray.length -1) {
		var correct = $("#correctAnswer").text();
		if (counter == 0) {
			counter = 10;
			$("#countdown").text("  (" + counter + ")");
			
			currentIndex++;
			//load the new question into the DOM
			showCorrect(correct);
			alert("Tíminn fór frá þér (" + correctAnswers.length + '/' + questionArray.length + ")");
			loadQuestion(questionArray[currentIndex]);
		}else{
			counter--;
			console.log(counter);
			$("#countdown").text("  (" + counter + ")");
		}
	}else{
		$("#countdown").text("");
	}
},1000);