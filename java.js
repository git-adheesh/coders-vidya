(function() {



    var questions = [
  
      {
        question: "Which component is used to compile, debug and execute java program?",
        choices: ["JVM", "JDK", "JIT", "JRE"],
        correctAnswer: 1
      },
      {
        question: "Which component is responsible for converting bytecode into machine specific code?",
        choices: ["JVM", "JDK", "JIT", "JRE"],
        correctAnswer: 0
      },
      {
        question: "Which component is responsible to run java program?",
        choices: ["JVM", "JDK", "JIT", "JRE"],
        correctAnswer: 3
      },
      {
        question: "Which of the following is a type of polymorphism in Java?",
        choices: ["Compile time polymorphism", "Execution time polymorphism", "Multiple polymorphism", "Multilevel polymorphism"],
        correctAnswer: 0
      },
      {
        question: "When does method overloading is determined?",
        choices: ["At run time", "At compile time", "At coding time", "At execution time"],
        correctAnswer: 1
      },
      {
        question: "Which concept of Java is a way of converting real world objects in terms of class?",
        choices: ["Polymorphism", "Encapsulation", "Abstraction", "Inheritance"],
        correctAnswer: 2
      },
      {
        question: "Which of the following are incorrect form of StringBuffer class constructor?",
        choices: ["StringBuffer()", "StringBuffer()", "StringBuffer(String str)", "StringBuffer(int size , String str)"],
        correctAnswer: 3
      },
      {
        question: "Which of these clause will be executed even if no exceptions are found?",
        choices: ["throws", "finally", "throw", "catch"],
        correctAnswer: 1
      },
      {
        question: "What will happen if two thread of the same priority are called to be processed simultaneously?",
        choices: ["Anyone will be executed first lexographically", "Both of them will be executed simultaneously", "None of them will be executed", " It is dependent on the operating system"],
        correctAnswer: 2
      },
      {
        question: "How can a protected modifier be accessed?",
        choices: ["accessible only within the class", "accessible only within package", "accessible within package and outside the package but through inheritance only", "accessible by all"],
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
  

