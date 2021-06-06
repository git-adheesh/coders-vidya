(function() {



    var questions = [
  
      {
        question: "Which of the following defines the title of a work?",
        choices: ["<cite>", "<hr>", "<a>", "<address>"],
        correctAnswer: 0
      },
      {
        question: "Which element is design to wrap a single piece of information?",
        choices: ["<time>", "<nav>", "<footer>", "<header>"],
        correctAnswer: 0
      },
      {
        question: "What an article element should not contain?",
        choices: ["Main element", "Text or embedded content", "Image", "Video & Audio"],
        correctAnswer: 0
      },
      {
        question: "Which element is used to get highlighted text in HTML5?",
        choices: ["<highlight>", "<b>", "<mark>", "<u>"],
        correctAnswer: 2
      },
      {
        question: "Which of the following is a new input attribute introduce by HTML5?",
        choices: ["text", " checkbox controls", "submit buttons", " date"],
        correctAnswer: 3
      },
      {
        question: "tel attribute is supported by the _________ browser?",
        choices: ["Chrome", "Safari", "Opera", " Internet Explorer"],
        correctAnswer: 1
      },
      {
        question: "Which element is used to create multi-line text input?",
        choices: ["text", "textarea", "submit", "radio button"],
        correctAnswer: 1
      },
      {
        question: "Which attribute is used with <select> element?",
        choices: ["multiple", "selected", "name", "value"],
        correctAnswer: 0
      },
      {
        question: "What does ‘On-Screen Action’ means in the testing of HTML5 applications?",
        choices: ["Using Drag action", "Using new input type", "Using play and pause action of audio and video elements", "Verifying SVG and Canvas elements"],
        correctAnswer: 0
      },
      {
        question: "Which of the following is used for plug-in content?",
        choices: ["<embed>", "<progress>", "<meter>", "<source>"],
        correctAnswer: 0
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
  

