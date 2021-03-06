(function() {



    var questions = [
  
      {
        question: "When collection of various computers seems a single coherent system to its client, then it is called?",
        choices: ["computer network", "distributed system", "networking system", "mail system"],
        correctAnswer: 1
      },
      {
        question: "Two devices are in network if __________?",
        choices: [" a process in one device is able to exchange information with a process in another device", "a process is running on both devices", "PIDs of the processes running of different devices are same", "a process is active and another is inactive"],
        correctAnswer: 0
      },
      {
        question: "Which of the following computer networks is built on the top of another network?",
        choices: ["prior network", "chief network", "prime network", "delay network"],
        correctAnswer: 3
      },
      {
        question: "In computer network nodes are _________?",
        choices: ["the computer that originates the data", "the computer that routes the data", "the computer that terminates the data", "all of the mentioned"],
        correctAnswer: 3
      },
      {
        question: "Communication channel is shared by all the machines on the network in ________?",
        choices: ["broadcast network", "unicast network", "multicast network", "anycast network"],
        correctAnswer: 0
      },
      {
        question: "Bluetooth is an example of __________?",
        choices: ["personal area network", " local area network", "virtual private network", "wide area network"],
        correctAnswer: 0
      },
      {
        question: " A list of protocols used by a system, one protocol per layer, is called ________?",
        choices: ["protocol architecture", "protocol stack", "protocol suite", "protocol system"],
        correctAnswer: 1
      },
      {
        question: "Network congestion occurs _________?",
        choices: ["in case of transfer failure", "when a system terminates", "when connection between two nodes terminates", "in case of traffic overloading"],
        correctAnswer: 3
      },
      {
        question: "Which of the following networks extends a private network across public networks?",
        choices: ["local area network", "virtual private network", "enterprise private network", "storage area network"],
        correctAnswer: 1
      },
      {
        question: "Which of this is not a network edge device?",
        choices: ["PC", "Smartphones", "Servers", "Switch"],
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
  