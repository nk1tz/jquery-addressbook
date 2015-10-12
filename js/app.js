// Add foundation dynamic functionality on page
$(document).foundation();

// Set the API base url
// var API_URL = "https://loopback-rest-api-demo-ziad-saab.c9.io/api";

// Get a reference to the <div id="app">. This is where we will output our stuff
var $app = $('#app');
var $buttons = $("#buttons");

var getFunctions = require('./lib/get');
var displayFunctions = require('./lib/display');


displayFunctions.displayAddressBooksList(0);
displayFunctions.AddressBooksListButtons();
