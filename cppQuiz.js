(function() {



    var questions = [
  
      {
        question: "What is virtual inheritance?",
        choices: ["C++ technique to avoid multiple copies of the base class into children/derived class", "C++ technique to avoid multiple inheritances of classes", "C++ technique to enhance multiple inheritanceI", "C++ technique to ensure that a private member of the base class can be accessed somehow"],
        correctAnswer: 0
      },
      {
        question: "What is the correct syntax of declaring array of pointers of integers of size 10 in C++?",
        choices: ["int arr = new int[10];", "int **arr = new int*[10];", "int *arr = new int[10];", "int *arr = new int*[10];"],
        correctAnswer: 1
      },
      {
        question: "What happens if a pointer is deleted twice in a program as shown in the following C++ statements? || int *ptr = new int;  ||  delete ptr;  ||  delete ptr;",
        choices: ["Undefined behaviour", " Syntactically incorrect", "Semantically incorrect", "The program runs perfectly"],
        correctAnswer: 0
      },
      {
        question: "Which of the following cannot be used with the virtual keyword?",
        choices: ["Class", "Member functions", "Constructors", "Destructors"],
        correctAnswer: 2
      },
      {
        question: "Which concept is used to implement late binding?",
        choices: ["Virtual functions", "Operator functions", "Constant functions", "Static functions"],
        correctAnswer: 0
      },
      {
        question: "Which of the following is correct?",
        choices: ["C++ allows static type checking", " C++ allows dynamic type checking.", " C++ allows static member function to be of type const.", "C++ allows both static and dynamic type checking"],
        correctAnswer: 3
      },
      {
        question: "Which of the following supports the concept that reusability is a desirable feature of a language?",
        choices: [" It reduces the testing time", "It reduces maintenance cost", "It decreases the compilation time", "It reduced both testing and maintenance time"],
        correctAnswer: 3
      },
      {
        question: "Which of the following is a static polymorphism mechanism?",
        choices: ["Function overloading", " Operator overloading", "Templates", "All of the mentioned"],
        correctAnswer: 3
      },
      {
        question: "Which of the following is not a type of inheritance?",
        choices: ["Multiple", "Multilevel", "Distributive", "Hierarchical"],
        correctAnswer: 2
      },
      {
        question: "Which of the following is used to make an abstract class?",
        choices: ["By using virtual keyword in front of a class declaration", "By using an abstract keyword in front of a class declaration", "By declaring a virtual function in a class", "By declaring a pure virtual function in a class"],
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
  

