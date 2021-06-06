(function() {



    var questions = [
  
      {
        question: "Explain android activity life cycle?",
        choices: ["onCreate() −> onStart() −> onActivityStarted() −> onResume() −> onPause() −> onStop() −> onActivityDistroy() −> onDestroy()", "OnCreate() −> onStart() −>onResume() −> onPause() −> onStop() −> onRestart() −> onDestroy()", "OnCreate() −> onStart() −> onPause() −> onResume() −> onStop() −> onDestroy()", "−>onResume()"],
        correctAnswer: 1
      },
      {
        question: "How many sizes are supported by Android?",
        choices: ["Android supported all sizes", "Machine level language", "Android supports small,normal, large and extra-large sizes", "Size is undefined in android"],
        correctAnswer: 2
      },
      {
        question: "How to pass the data from activity to services in android?",
        choices: ["We can store the data in a common database and access the data on services as well as in Activity", "We can't pass data from activity to services.", "Using putExtra() method in intent, we can pass the data using setResult()", " A & C"],
        correctAnswer: 3
      },
      {
        question: "How many applications are there in a given task in android?",
        choices: ["TWO", "ONE", "MANY", "ZERO"],
        correctAnswer: 2
      },
      {
        question: "How to get current location in android?",
        choices: ["Using with GPRS", "Using location provider", "A & B", "SQlite"],
        correctAnswer: 2
      },
      {
        question: "How many ports are allocated for new emulator?",
        choices: ["2", "0", "10", "none of the above"],
        correctAnswer: 0
      },
      {
        question: "What is JSON in android?",
        choices: ["Java Script Object Native", "Java Script Oriented Notation", "Java Script Object Notation", "None of the Above"],
        correctAnswer: 2
      },
      {
        question: "What are the JSON elements in android?",
        choices: ["integer, boolean", "boolean", "null", "Number, string, boolean, null, array, and object"],
        correctAnswer: 3
      },
      {
        question: "What is ANR responding time in android?",
        choices: ["10 sec", "5 sec", "1 min", "None of the above"],
        correctAnswer: 1
      },
      {
        question: "What are the main components in android?",
        choices: ["Activity", "Services", "Broadcast Receiver and Content provider", "all of the above"],
        correctAnswer: 3
      },
  
  
    ];
  
    var questionCounter = 0; //Tracks question number
    var selections = []; //Array containing user choices
    var quiz = $('#quiz'); //Quiz div object
  
    // Display initial question
    displayNext();
  
    // Click handler for the 'next' button
    $('#next').on('click', function(e) {
      e.preventDefault();
  
      // Suspend click listener during fade animation
      if (quiz.is(':animated')) {
        return false;
      }
      choose();
  
      // If no user selection, progress is stopped
      if (isNaN(selections[questionCounter])) {
        alert('You have not answered the Question ! ');
      } else {
        questionCounter++;
        displayNext();
      }
    });
  
    // Click handler for the 'prev' button
    $('#prev').on('click', function(e) {
      e.preventDefault();
  
      if (quiz.is(':animated')) {
        return false;
      }
      choose();
      questionCounter--;
      displayNext();
    });
  
    // Click handler for the 'Start Over' button
    $('#start').on('click', function(e) {
      e.preventDefault();
  
      if (quiz.is(':animated')) {
        return false;
      }
      questionCounter = 0;
      selections = [];
      displayNext();
      $('#start').hide();
      //check
      $('#home').hide();
    });
  
    // Animates buttons on hover
    $('.button').on('mouseenter', function() {
      $(this).addClass('active');
    });
    $('.button').on('mouseleave', function() {
      $(this).removeClass('active');
    });
  
    // Creates and returns the div that contains the questions and
    // the answer selections
    function createQuestionElement(index) {
      var qElement = $('<div>', {
        id: 'question'
      });
  
      var header = $('<h2>Question ' + (index + 1) + ':</h2>');
      qElement.append(header);
  
      var question = $('<p>').append(questions[index].question);
      qElement.append(question);
  
      var radioButtons = createRadios(index);
      qElement.append(radioButtons);
  
      return qElement;
    }
  
    // Creates a list of the answer choices as radio inputs
    function createRadios(index) {
      var radioList = $('<ul>');
      var item;
      var input = '';
      for (var i = 0; i < questions[index].choices.length; i++) {
        item = $('<li>');
        input = '<input type="radio" name="answer" value=' + i + ' />';
        input += questions[index].choices[i];
        item.append(input);
        radioList.append(item);
      }
      return radioList;
    }
  
    // Reads the user selection and pushes the value to an array
    function choose() {
      selections[questionCounter] = +$('input[name="answer"]:checked').val();
    }
  
    // Displays next requested element
    function displayNext() {
      quiz.fadeOut(function() {
        $('#question').remove();
  
        if (questionCounter < questions.length) {
          var nextQuestion = createQuestionElement(questionCounter);
          quiz.append(nextQuestion).fadeIn();
          if (!(isNaN(selections[questionCounter]))) {
            $('input[value=' + selections[questionCounter] + ']').prop('checked', true);
          }
  
          // Controls display of 'prev' button
          if (questionCounter === 1) {
            $('#prev').show();
          } else if (questionCounter === 0) {
  
            $('#prev').hide();
            $('#next').show();
          }
        } else {
          var scoreElem = displayScore();
          quiz.append(scoreElem).fadeIn();
          $('#next').hide();
          $('#prev').hide();
          $('#start').show();
          // check
        $('#home').show();
        }
      });
    }
  
    // Computes score and returns a paragraph element to be displayed
    function displayScore() {
      var score = $('<p>', {
        id: 'question'
      });
      var numCorrect = 0;
      for (var i = 0; i < selections.length; i++) {
        if (selections[i] === questions[i].correctAnswer) {
          numCorrect++;
        }
      }
      score.append('You got ' + numCorrect + ' out of ' +
        questions.length + '.');
      return score;
    }
  })();
  

