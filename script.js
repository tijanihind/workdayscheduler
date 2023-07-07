// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the htm
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  //
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  //
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //
  // TODO: Add code to display the current date in the header of the page.
// Get the current date and display it at
// Function to display the current day at the top of the calendar
function displayCurrentDay() {
    var currentDate = dayjs().format("dddd, MMMM D, YYYY");
    $("#currentDay").text(currentDate);
  }
  
  // Function to color-code the time blocks based on the current time
  function colorCodeTimeBlocks() {
    var currentHour = dayjs().hour();
  
    $(".time-block").each(function () {
      var blockHour = parseInt($(this).attr("id").split("-")[1]);
  
      if (blockHour < currentHour) {
        $(this).removeClass("present future").addClass("past");
      } else if (blockHour === currentHour) {
        $(this).removeClass("past future").addClass("present");
      } else {
        $(this).removeClass("past present").addClass("future");
      }
    });
  }
  
  // Function to save the event to local storage
  function saveEvent() {
    var hour = $(this).parent().attr("id");
    var eventText = $(this).siblings(".description").val();
  
    localStorage.setItem(hour, eventText);
  }
  
  // Function to load the saved events from local storage
  function loadEvents() {
    $(".time-block").each(function () {
      var hour = $(this).attr("id");
      var eventText = localStorage.getItem(hour);
  
      $(this).find(".description").val(eventText);
    });
  }
  
  // Event listener for save button clicks
  $(".saveBtn").on("click", saveEvent);
  
  // Display the current day and color-code the time blocks on page load
  $(document).ready(function () {
    displayCurrentDay();
    colorCodeTimeBlocks();
    loadEvents();
  });
  