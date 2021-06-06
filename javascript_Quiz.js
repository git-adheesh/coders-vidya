(function() {



    var questions = [
  
      {
        question: "The functions provide() and require() of Dojo toolkit and Google’s Closure library are used for",
        choices: ["declaring and loading modules", "declaring functions", "declaring modules", "loading modules"],
        correctAnswer: 0
      },
      {
        question: " The maximum number of global symbols a module can define is",
        choices: ["2", "3", "1", "4"],
        correctAnswer: 2
      },
      {
        question: "The scope of a function is also called as",
        choices: ["Predefined function", "Module function", "Public function", " Private function"],
        correctAnswer: 1
      },
      {
        question: "What can be done in order to avoid the creation of global variables in JavaScript?",
        choices: ["To use a method that defines all the variables", "To use an object that has the reference to all the variables", "To use an object as its namespace", " To use global functions"],
        correctAnswer: 2
      },
      {
        question: "Which of the operator is used to test if a particular property exists or not?",
        choices: ["in", "exist", "within", "exists"],
        correctAnswer: 0
      },
      {
        question: "The expression of calling (or executing) a function or method in JavaScript is called ",
        choices: ["Primary expression", "Functional expression", "Invocation expression", " Property Access Expression"],
        correctAnswer: 2
      },
      {
        question: "What is the function used to deregister event handler ‘f’?",
        choices: ["deleteAllListeners(name)", "deleteListener(name,f)", "removeListener(name,f)", "removeAllListeners(name)"],
        correctAnswer: 2
      },
      {
        question: "Which of the following is an event emitter?",
        choices: ["once", "process", "listeners", "on"],
        correctAnswer: 1
      },
      {
        question: "When do uncaught exceptions generate events?",
        choices: ["When handlers are registered", "When handlers are deregistered", "When handler functions are called", "When handlers do not have a matching catch clause"],
        correctAnswer: 2
      },
      {
        question: "Which among the following POSIX signals generate events?",
        choices: ["SIGDOWN", "SIGFLOAT", "SIGINT", "SIGSHORT"],
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
  

