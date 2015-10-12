// Add foundation dynamic functionality on page
$(document).foundation();

//import functions from other files
var getFunctions = require("./get.js");
var displayFunctions = require("./display.js");

// Set the API base url
var API_URL = "https://loopback-rest-api-demo-ziad-saab.c9.io/api";
var $app = $('#app');
var $buttons = $("#buttons");



//this starts the program by calling the function to list the
//address book entries and add the buttons to the DOM
displayFunctions.displayAddressBooksList(0);
displayFunctions.AddressBooksListButtons();