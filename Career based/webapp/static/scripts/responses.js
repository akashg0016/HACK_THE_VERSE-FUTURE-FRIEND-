function getBotResponse(input) {
  console.log(input);
  // Rock, paper, scissors
  if (input === "rock") {
    return "paper";
  } else if (input === "paper") {
    return "scissors";
  } else if (input === "scissors") {
    return "rock";
  }

  // Specific responses
  if (input.toLowerCase() === "hello" || "hi") {
    return "Hello there!";
  } else if (input.toLowerCase() === "goodbye") {
    return "Talk to you later!";
  } else if (input.toLowerCase().includes("how are you")) {
    return "I'm just a bot, but thanks for asking!";
  } else if (input.toLowerCase() === "skill test") {
    // Add your logic for handling the "skill test" option
    return "Sure, let's get started with the skill test!";
  } else if (input.toLowerCase() === "personality test") {
    // Add your logic for handling the "personality test" option
    return "Great choice! Let's begin the personality test.";
  } else if (input.toLowerCase() === "interests") {
    // Add your logic for handling the "interests" option
    return "Awesome! Let's explore your interests.";
  } else if (input === "#1") {
    // User chose option 1 (Personality Test)
    return handlePersonalityTest();
  } else if (input === "#2") {
    // User chose option 2 (Skill Test)
    return handleSkillTest();
  } else if (input === "#3") {
    // User chose option 3 (Interests)
    return handleInterests();
  } else if (input === "1") {
    // User chose option 1 (Personality Test)
    return "1";
  } else if (input === "2") {
    // User chose option 2 (Skill Test)
    return "2";
  } else if (input === "3") {
    // User chose option 3 (Interests)
    return "3";
  } else if (input === "4") {
    // User chose option 1 (Personality Test)
    return "4";
  } else if (input === "5") {
    // User chose option 2 (Skill Test)
    return "5";
  } else if (input === "6") {
    // User chose option 3 (Interests)
    return "6";
  } else {
    // Default response for unexpected input
    return "I didn't understand. Please choose a valid option. To begin your path to predict your career  Enter 1 for personality test, Enter 2 for skill test, Enter 3 for interests.";
  }
}

// Function to handle Personality Test
function handlePersonalityTest() {
  let questions = [
    "Question 1: What is your experience with JavaScript?",
    "Question 2: Can you explain the concept of closures?",
    "Question 3: Can you explain the concept of closures?",
    "Question 4: Can you explain the concept of closures?",
    "Question 5: Can you explain the concept of closures?",
    "Question 6: Can you explain the concept of closures?",
    "Question 7: Can you explain the concept of closures?",
  ];

  // Counter to keep track of the current question index
  let currentQuestionIndex = 0;

  function displayQuestion() {
    // Display the question and options in the chatbox
    const options = [
      "1 - Not interested",
      "2 - Poor",
      "3 - Beginner",
      "4 - Average",
      "5 - Excellent",
    ];

    const questionHtml =
      `<p class="botText"><span>${questions[currentQuestionIndex]}</span></p>` +
      `<p class="botText"><span>Options: ${options.join(", ")}</span></p>`;
    $("#chatbox").append(questionHtml);

    // Scroll to the bottom of the chatbox
    document.getElementById("chat-bar-bottom").scrollIntoView(true);
  }

  // Function to process user response
  function processUserResponse(userResponse) {
    // Check if the user provided a valid answer (a number between 1 and 5)
    const userRating = parseInt(userResponse);
    if (!isNaN(userRating) && userRating >= 1 && userRating <= 5) {
      // Display the user's answer in the chatbox
      const userHtml = `<p class="userText"><span>Rating: ${userRating}</span></p>`;
      $("#chatbox").append(userHtml);

      // Store user's answer in the userAnswers array
      userAnswers.push({
        question: questions[currentQuestionIndex],
        answer: options[userRating - 1].split(" - ")[1],
      });

      // Move to the next question or finish the test
      if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        displayQuestion();
      } else {
        // Display completion message or process userAnswers array
        const completionMessage =
          '<p class="botText"><span>Personality Test completed. Thank you!</span></p>';
        $("#chatbox").append(completionMessage);

        // Send user answers to Flask server
        sendUserAnswersToServer();

        // Scroll to the bottom of the chatbox
        document.getElementById("chat-bar-bottom").scrollIntoView(true);
      }
    } else {
      // Display a message for an invalid answer
      const invalidAnswerMessage =
        '<p class="botText"><span>Please enter a valid rating between 1 and 5.</span></p>';
      $("#chatbox").append(invalidAnswerMessage);

      // Scroll to the bottom of the chatbox
      document.getElementById("chat-bar-bottom").scrollIntoView(true);
    }
  }

  // Start asking the first question
  displayQuestion();

  // Listen for Enter key press in the text input
  $("#textInput").keypress(function (e) {
    if (e.which === 13) {
      // Get user input from the text input box
      const userResponse = $("#textInput").val();

      // If the input is empty, set a default message
      if (userResponse === "") {
        processUserResponse("No answer provided.");
      } else {
        // Clear the text input box
        $("#textInput").val("");

        // Process the user's response
        processUserResponse(userResponse);
      }
    }
  });
}

// Function to send user answers to Flask server
function sendUserAnswersToServer() {
  fetch("/save_answers", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ userAnswers }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Server response:", data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

// Function to handle Skill Test
function handleSkillTest() {
  let questions = [
    "Question 1: What is your experience with JavaScript?",
    "Question 2: Can you explain the concept of closures?",
    "Question 3: Can you explain the concept of closures?",
    "Question 4: Can you explain the concept of closures?",
    "Question 5: Can you explain the concept of closures?",
    "Question 6: Can you explain the concept of closures?",
    "Question 7: Can you explain the concept of closures?",
    "Question 8: Can you explain the concept of closures?",
    "Question 9: Can you explain the concept of closures?",
    "Question 10: Can you explain the concept of closures?",
    "Question 11: Can you explain the concept of closures?",
    "Question 12: Can you explain the concept of closures?",
    "Question 13: Can you explain the concept of closures?",
    "Question 14: Can you explain the concept of closures?",
    "Question 15: Can you explain the concept of closures?",
    "Question 16: Can you explain the concept of closures?",
    "Question 17: What is your favorite feature of ES6?",
  ];

  let userAnswers = [];
  let currentQuestionIndex = 0;

  function askQuestion() {
    let botHtml =
      '<p class="botText"><span>' +
      questions[currentQuestionIndex] +
      "<br>Choose a rating from 1 to 6:<br>1 - Not interested<br>2 - Poor<br>3 - Beginner<br>4 - Average<br>5 - Excellent<br>6 - Professional</span></p>";
    $("#chatbox").append(botHtml);

    // Scroll to the bottom of the chatbox
    document.getElementById("chat-bar-bottom").scrollIntoView(true);
  }

  // Function to process user response
  function processUserResponse(userResponse) {
    // Check if the user provided a valid answer (a number between 1 and 6)
    let userRating = parseInt(userResponse);
    if (!isNaN(userRating) && userRating >= 1 && userRating <= 6) {
      // Display the user's answer
      let userHtml =
        '<p class="userText"><span>Rating: ' + userRating + "</span></p>";
      $("#chatbox").append(userHtml);

      // Store user's answer
      userAnswers.push(userRating);

      // Move to the next question or finish the test
      if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        askQuestion();
      } else {
        // Display completion message or process userAnswers array
        let completionMessage =
          '<p class="botText"><span>Skill Test completed. Thank you!</span></p>';
        $("#chatbox").append(completionMessage);

        // Process the userAnswers array as needed
        console.log("User Answers:", userAnswers);
      }

      // Scroll to the bottom of the chatbox
      document.getElementById("chat-bar-bottom").scrollIntoView(true);
    } else {
      // Display a message for an invalid answer
      let invalidAnswerMessage =
        '<p class="botText"><span>Please enter a valid rating between 1 and 6.</span></p>';
      $("#chatbox").append(invalidAnswerMessage);

      // Scroll to the bottom of the chatbox
      document.getElementById("chat-bar-bottom").scrollIntoView(true);
    }
  }

  // Start asking the first question
  askQuestion();

  // Listen for Enter key press in the text input
  $("#textInput").keypress(function (e) {
    if (e.which === 13) {
      // Get user input from the text input box
      let userResponse = $("#textInput").val();

      // If the input is empty, set a default message
      if (userResponse === "") {
        userResponse = "No answer provided.";
      }

      // Clear the text input box
      $("#textInput").val("");

      // Process the user's response
      processUserResponse(userResponse);
    }
  });
}
// Function to handle Interests
function handleInterests() {
  let questions = [
    "Not satisfied with the predicted path?? Let me know your field of interest",
  ];

  let userAnswers = [];
  let currentQuestionIndex = 0;

  function askQuestion() {
    let botHtml =
      '<p class="botText"><span>' +
      questions[currentQuestionIndex] +
      "</span></p>";
    $("#chatbox").append(botHtml);

    // Scroll to the bottom of the chatbox
    document.getElementById("chat-bar-bottom").scrollIntoView(true);
  }

  // Function to process user response
  function processUserResponse(userResponse) {
    let userHtml = '<p class="userText"><span>' + userResponse + "</span></p>";
    $("#chatbox").append(userHtml);

    // Store user's answer
    userAnswers.push(userResponse);

    // Move to the next question or finish the test
    if (currentQuestionIndex < questions.length - 1) {
      currentQuestionIndex++;
      askQuestion();
    } else {
      // Display completion message or process userAnswers array
      let completionMessage =
        '<p class="botText"><span>Skill Test completed. Thank you!</span></p>';
      $("#chatbox").append(completionMessage);

      // Process the userAnswers array as needed
      console.log("User Answers:", userAnswers);
    }

    // Scroll to the bottom of the chatbox
    document.getElementById("chat-bar-bottom").scrollIntoView(true);
  }

  // Start asking the first question
  askQuestion();

  // Listen for Enter key press in the text input
  $("#textInput").keypress(function (e) {
    if (e.which === 13) {
      // Get user input from the text input box
      let userResponse = $("#textInput").val();

      // If the input is empty, set a default message
      if (userResponse === "") {
        userResponse = "No answer provided.";
      }

      // Clear the text input box
      $("#textInput").val("");

      // Process the user's response
      processUserResponse(userResponse);
    }
  });
}
