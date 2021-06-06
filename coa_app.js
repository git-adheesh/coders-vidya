(function() {



    var questions = [
  
      {
        question: "The 8-bit encoding format used to store data in a computer is?",
        choices: ["ASCII", "EBCDIC", "ANCI", "USCII"],
        correctAnswer: 1
      },
      {
        question: "A source program is usually in ?",
        choices: ["Assembly language", "Machine level language", "High-level language", "Natural language"],
        correctAnswer: 2
      },
      {
        question: "Which memory device is generally made of semiconductors??",
        choices: ["RAM", "Hard-disk", "Floppy disk", "Cd disk"],
        correctAnswer: 0
      },
      {
        question: "The small extremely fast, RAM’s are called as?",
        choices: ["Cache", "Heaps", "Accumulators", "Stacks"],
        correctAnswer: 0
      },
      {
        question: "The ALU makes use of _______ to store the intermediate results.",
        choices: ["Accumulators", "Registers", "Heap", "Stack"],
        correctAnswer: 0
      },
      {
        question: "The control unit controls other units by generating ?",
        choices: ["Control signals", "Transfer signals", "Command Signals", "Timing signals"],
        correctAnswer: 3
      },
      {
        question: " ______ are numbers and encoded characters, generally used as operands?",
        choices: ["Input", "Data", " Information", "Stored Values"],
        correctAnswer: 1
      },
      {
        question: "______ bus structure is usually used to connect I/O devices.",
        choices: ["Single bus", "Multiple bus", "Star bus", "Rambus"],
        correctAnswer: 0
      },
      {
        question: " The I/O interface required to connect the I/O device to the bus consists of ______?",
        choices: ["Address decoder and registers", "Control circuits", "Address decoder, registers and Control circuits", "Only Control circuits"],
        correctAnswer: 2
      },
      {
        question: "Which one of the following is not a valid state of a threadTo reduce the memory access time we generally make use of ___?",
        choices: ["Heaps", "Higher capacity RAM’s", "SDRAM’s", "Cache’s"],
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
  