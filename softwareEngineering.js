(function() {



    var questions = [
  
      {
        question: "Build & Fix Model is suitable for programming exercises of ___________ LOC (Line of Code).",
        choices: ["100-200", "200-400", "400-1000", "above 1000"],
        correctAnswer: 0
      },
      {
        question: "RAD stands for_____?",
        choices: ["Relative Application Development", "Rapid Application Development", "Rapid Application Document", "None of the mentioned"],
        correctAnswer: 1
      },
      {
        question: "Which one of the following models is not suitable for accommodating any change?",
        choices: ["Build & Fix Model", "Prototyping Model", "RAD Model", "Waterfall Model"],
        correctAnswer: 3
      },
      {
        question: "Which is not one of the types of prototype of Prototyping Model?",
        choices: ["Horizontal Prototype", "Vertical Prototype", "Diagonal Prototype", "Domain Prototype"],
        correctAnswer: 2
      },
      {
        question: "Which one of the following is not a phase of Prototyping Model?",
        choices: ["Quick Design", "Coding", "Prototype Refinement", "Engineer Product"],
        correctAnswer: 1
      },
      {
        question: "Which of the following statements regarding Build & Fix Model is wrong?",
        choices: ["No room for structured design", "Code soon becomes unfixable & unchangeable", "Maintenance is practically not possible", " It scales up well to large projects"],
        correctAnswer: 3
      },
      {
        question: "RAD Model has ?",
        choices: ["2 phases", "3 phases", "5 phases", "6 phases"],
        correctAnswer: 2
      },
      {
        question: "What is the major drawback of using RAD Model?",
        choices: ["Highly specialized & skilled developers/designers are required", "Increases reusability of components", "Encourages customer/client feedback", "Increases reusability of components, Highly specialized & skilled developers/designers are required"],
        correctAnswer: 3
      },
      {
        question: "SDLC stands for",
        choices: ["Software Development Life Cycle", " System Development Life cycle", "Software Design Life Cycle", "System Design Life Cycle"],
        correctAnswer: 0
      },
      {
        question: "Which model can be selected if user is involved in all the phases of SDLC?",
        choices: ["Waterfall Model", "Prototyping Model", "RAD Model", "both Prototyping Model & RAD Model"],
        correctAnswer: 2
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
  