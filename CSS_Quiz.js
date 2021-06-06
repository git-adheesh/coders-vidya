(function() {



    var questions = [
  
      {
        question: "Which of the following Viewport Property sets the initial scaling factor?",
        choices: ["scale", "initial-scale", "minimum-scale", "user-scale"],
        correctAnswer: 1
      },
      {
        question: "Which of the following property is used to define the time it takes one iteration of an animation to play?",
        choices: ["transition-property", "transition-timing", "transition-duration", "user-select"],
        correctAnswer: 2
      },
      {
        question: "Which of the following CSS property defines whether the animation is running or paused?",
        choices: ["animation-pause-state", "animation-state", "animation-play-state", "all of the mentioned"],
        correctAnswer: 2
      },
      {
        question: "Which of the following property specifies whether an element is an accelerator indicator or not?",
        choices: ["animation", "accelerator", "scan", "none of the mentioned"],
        correctAnswer: 1
      },
      {
        question: "Which of the following property specifies the direction in which a marquee should move?",
        choices: ["marquee", "marquee-direction", "marquee-time", "none of the mentioned"],
        correctAnswer: 1
      },
      {
        question: "Which of the following is not the value for an unordered list?",
        choices: ["disc", "square", "circle", "numeric"],
        correctAnswer: 3
      },
      {
        question: "Which of the following will take the element out of normal flow?",
        choices: ["fixed positioning", "floating elements", "relative positioning", "absolute positioning"],
        correctAnswer: 1
      },
      {
        question: "Which of the following is not a combinatory?",
        choices: ["*", ">", "~", "+"],
        correctAnswer: 0
      },
      {
        question: "Which of the following specifies how to slice border image?",
        choices: ["border-image", " border-image-source", "border-image-outset", "border-image-slice"],
        correctAnswer: 3
      },
      {
        question: "Which value specifies animation with slow start?",
        choices: ["ease-out", "ease-in", "linear", "ease"],
        correctAnswer: 1
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
  

