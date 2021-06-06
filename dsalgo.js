(function() {



    var questions = [
  
      {
        question: "Which of the following is not an inherent application of stack?",
        choices: ["Reversing a string", "Evaluation of postfix expression", "Implementation of recursion", " Job scheduling"],
        correctAnswer: 3
      },
      {
        question: "The type of expression in which operator succeeds its operands is?",
        choices: ["Infix Expression", "Prefix Expression", "Postfix Expression", "Both Prefix and Postfix Expressions"],
        correctAnswer: 2
      },
      {
        question: "Which matrix has most of the elements (not all) as Zero?",
        choices: ["Identity Matrix", "Unit Matrix", "Sparse Matrix", "Zero Matrix"],
        correctAnswer: 2
      },
      {
        question: "What is an AVL tree?",
        choices: ["a tree which is balanced and is a height balanced tree", "a tree which is unbalanced and is a height balanced tree", "a tree with three children", "a tree with atmost 3 children"],
        correctAnswer: 0
      },
      {
        question: "What maximum difference in heights between the leafs of a AVL tree is possible?",
        choices: ["log(n) where n is the number of nodes", "n where n is the number of nodes", "0 or 1", "atmost 1"],
        correctAnswer: 0
      },
      {
        question: "In a max-heap, element with the greatest key is always in the which node?",
        choices: ["Leaf node", "First node of left sub tree", "root node", "First node of right sub tree"],
        correctAnswer: 2
      },
      {
        question: "An array consists of n elements. We want to create a heap using the elements. The time complexity of building a heap will be in order of",
        choices: [" O(n*n*logn)", "O(n*logn)", "O(n*n)", "O(n *logn *logn)"],
        correctAnswer: 1
      },
      {
        question: "What is the number of edges present in a complete graph having n vertices?",
        choices: ["(n*(n+1))/2", "(n*(n-1))/2", "n", "Information given is insufficient"],
        correctAnswer: 1
      },
      {
        question: "Which of the following is true?",
        choices: ["B + tree allows only the rapid random access", "B + tree allows only the rapid sequential access", "B + tree allows rapid random access as well as rapid sequential access", "B + tree allows rapid random access and slower sequential access"],
        correctAnswer: 2
      },
      {
        question: "What is the maximum number of keys that a B+ -tree of order 3 and of height 3 have?",
        choices: ["3", "80", "27", "26"],
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
  

