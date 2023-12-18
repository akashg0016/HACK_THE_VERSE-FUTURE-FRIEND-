// Collapsible
var coll = document.getElementsByClassName("collapsible");

for (let i = 0; i < coll.length; i++) {
  coll[i].addEventListener("click", function () {
    this.classList.toggle("active");

    var content = this.nextElementSibling;

    if (content.style.maxHeight) {
      content.style.maxHeight = null;
    } else {
      content.style.maxHeight = content.scrollHeight + "px";
    }
  });
}

function getTime() {
  let today = new Date();
  hours = today.getHours();
  minutes = today.getMinutes();

  if (hours < 10) {
    hours = "0" + hours;
  }

  if (minutes < 10) {
    minutes = "0" + minutes;
  }

  let time = hours + ":" + minutes;
  return time;
}

// Gets the first message
function firstBotMessage() {
  // Set the initial message for the bot
  let firstMessage = "How's it going?";
  document.getElementById("botStarterMessage").innerHTML =
    '<p class="botText"><span>' + firstMessage + "</span></p>";

  // Get the current time and append it to the chat timestamp
  let time = getTime();
  $("#chat-timestamp").append(time);

  // Scroll to the bottom of the chatbox
  document.getElementById("userInput").scrollIntoView(false);
}

// Call the function to display the first bot message
firstBotMessage();

// Retrieves the response
function getHardResponse(userText) {
  // Get the bot's response based on user input
  let botResponse = getBotResponse(userText);
  let botHtml = '<p class="botText"><span>' + botResponse + "</span></p>";

  // Append the bot's response to the chatbox
  $("#chatbox").append(botHtml);

  // Scroll to the bottom of the chatbox
  document.getElementById("chat-bar-bottom").scrollIntoView(true);
}

// Function to handle actions based on bot responses
function handleBotResponse(getBotResponse) {
  if (
    getBotResponse
      .toLowerCase()
      .includes("begin your path to predict your career")
  ) {
    // Display options for career prediction
    let careerOptions =
      "Enter 1 for personality test, Enter 2 for skill test, Enter 3 for interests.";
    let botHtml = '<p class="botText"><span>' + careerOptions + "</span></p>";
    $("#chatbox").append(botHtml);
  } else if (getBotResponse.toLowerCase().includes("1")) {
    // User chose option 1 (Personality Test)
    handlePersonalityTest();
  } else if (getBotResponse.toLowerCase().includes("2")) {
    // User chose option 2 (Skill Test)
    handleSkillTest();
  } else if (getBotResponse.toLowerCase().includes("3")) {
    // User chose option 3 (Interests)
    handleInterests();
  } else {
    // Default response for unexpected input
    let defaultResponse = "I didn't understand. Please choose a valid option.";
    let botHtml = '<p class="botText"><span>' + defaultResponse + "</span></p>";
    $("#chatbox").append(botHtml);
  }
  // Add more conditions based on other responses if needed
}

// Function to handle Personality Test
function handlePersonalityTest() {
  // Add your logic for handling Personality Test
  let botHtml =
    '<p class="botText"><span>You selected Personality Test. Here are some questions...</span></p>';
  $("#chatbox").append(botHtml);
  // Add more logic as needed
}

// Function to handle Skill Test
function handleSkillTest() {
  // Add your logic for handling Skill Test
  let botHtml =
    '<p class="botText"><span>You selected Skill Test. Here are some questions...</span></p>';
  $("#chatbox").append(botHtml);
  // Add more logic as needed
}

// Function to handle Interests
function handleInterests() {
  // Add your logic for handling Interests
  let botHtml =
    '<p class="botText"><span>You selected Interests. Here are some questions...</span></p>';
  $("#chatbox").append(botHtml);
  // Add more logic as needed
}

// Gets the text from the input box and processes it
function getResponse() {
  // Get user input from the text input box
  let userText = $("#textInput").val();

  // If the input is empty, set a default message
  if (userText == "") {
    userText = "I love Code Palace!";
  }

  // Create HTML for the user's message
  let userHtml = '<p class="userText"><span>' + userText + "</span></p>";

  // Clear the text input box
  $("#textInput").val("");

  // Append the user's message to the chatbox
  $("#chatbox").append(userHtml);

  // Scroll to the bottom of the chatbox
  document.getElementById("chat-bar-bottom").scrollIntoView(true);

  // Delay and then call the function to get the bot's response
  setTimeout(() => {
    getHardResponse(userText);
  }, 1000);
}

// Handles sending text via button clicks
function buttonSendText(sampleText) {
  // Create HTML for the user's message using the provided text
  let userHtml = '<p class="userText"><span>' + sampleText + "</span></p>";

  // Clear the text input box
  $("#textInput").val("");

  // Append the user's message to the chatbox
  $("#chatbox").append(userHtml);

  // Scroll to the bottom of the chatbox
  document.getElementById("chat-bar-bottom").scrollIntoView(true);
}

// Function to be called when the send button is clicked
function sendButton() {
  // Call the function to process and display the user's input
  getResponse();
}

// Function to be called when the heart button is clicked
function heartButton() {
  // Call the function to send a predefined message when the heart button is clicked
  buttonSendText("Heart clicked!");
}

// Press enter to send a message
$("#textInput").keypress(function (e) {
  if (e.which == 13) {
    // Call the function to process and display the user's input when Enter is pressed
    getResponse();
  }
});
