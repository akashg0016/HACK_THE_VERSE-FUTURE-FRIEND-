// Ensure the DOM is fully loaded before executing the script
$(document).ready(function () {
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
    let hours = today.getHours();
    let minutes = today.getMinutes();

    hours = hours < 10 ? "0" + hours : hours;
    minutes = minutes < 10 ? "0" + minutes : minutes;

    let time = hours + ":" + minutes;
    return time;
  }

  // Gets the first message
  function firstBotMessage() {
    // Set the initial message for the bot
    let firstMessage = "How's it going?";
    $("#botStarterMessage").html(
      '<p class="botText"><span>' + firstMessage + "</span></p>"
    );

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
    console.log("User Text:", userText);
    let botResponse = getBotResponse(userText);
    let botHtml = '<p class="botText"><span>' + botResponse + "</span></p>";

    // Append the bot's response to the chatbox
    $("#chatbox").append(botHtml);

    // Scroll to the bottom of the chatbox
    document.getElementById("chat-bar-bottom").scrollIntoView(true);
  }

  // Gets the text from the input box and processes it
  function getResponse() {
    // Get user input from the text input box
    let userText = $("#textInput").val();
    console.log("User Input:", $("#textInput").val());
    // If the input is empty, set a default message
    if (userText === "") {
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
    if (e.which === 13) {
      // Call the function to process and display the user's input when Enter is pressed
      getResponse();
    }
  });
});


