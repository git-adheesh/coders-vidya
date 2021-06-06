(function() {



  var questions = [

    {
      question: "Linux uses a time-sharing algorithm ___________?",
      choices: ["to pair preemptive scheduling between multiple processes", "for tasks where absolute priorities are more important than fairness", "all of the mentioned", "none of the mentioned"],
      correctAnswer: 0
    },
    {
      question: "The first linux kernel which supports the SMP hardware?",
      choices: ["linux 0.1", "linux 1.0", "linux 1.2", "linux 2.0"],
      correctAnswer: 3
    },
    {
      question: "Which one of the following linux file system does not support journaling feature?",
      choices: ["ext2", "ext3", "ext4", "None of the above"],
      correctAnswer: 0
    },
    {
      question: "Which binary format is supported by linux?",
      choices: ["a.out", "elf", "both a.out and ELF", "None"],
      correctAnswer: 2
    },
    {
      question: "Which one of the following bootloader is not used by linux?",
      choices: ["GRUB", "LILO", "NTLDR", "None of the mentioned"],
      correctAnswer: 2
    },
    {
      question: "Standard set of functions through which interacts with kernel is defined by?",
      choices: ["system libraries", "kernel code", "compilers", "utility programs"],
      correctAnswer: 0
    },
    {
      question: "Which one of the following is not a linux distribution?",
      choices: ["debian", "gentoo", "open SUSE", "multics"],
      correctAnswer: 3
    },
    {
      question: "Which one of the following is not shared by threads?",
      choices: ["program counter", "stack", "both program counter and stack", "none of the mentioned"],
      correctAnswer: 2
    },
    {
      question: "When the event for which a thread is blocked occurs?",
      choices: ["thread moves to the ready queue", "thread remains blocked", "thread completes", "a new thread is provided"],
      correctAnswer: 0
    },
    {
      question: "Which one of the following is not a valid state of a thread?",
      choices: ["running", "parsing", "ready", "blocked"],
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
