// Add foundation dynamic functionality on page
$(document).foundation();

// Set the API base url
var API_URL = "https://loopback-rest-api-demo-ziad-saab.c9.io/api";

// Get a reference to the <div id="app">. This is where we will output our stuff
var $app = $('#app');

// Data retrieval functions
function getAddressBooks() {
    return $.getJSON(API_URL + '/AddressBooks');
}

function getAddressBook(id) {
    return $.getJSON(API_URL + '/AddressBooks/' + id);
}

function getEntries(addressBookId) {
    // TODO...
    return $.getJSON(API_URL + "/Entries?filter[where][addressBookId]=" + addressBookId  +"&filter[order]=lastName%20ASC&filter[limit]=5");
    
}

console.log( getEntries(2) );

function getEntry(entryId) {
    // TODO..
    return $.getJSON(API_URL + '/Entries/' + id);
}
// End data retrieval functions

// Functions that display things on the screen (views)
function displayAddressBooksList() {
    getAddressBooks().then(
        function(addressBooks) {
            
            $app.html(''); // Clear the #app div
            $app.append('<h2>Address Books List</h2>');
            $app.append('<ul></ul>');
            
            addressBooks.forEach(function(ab) {
                $app.find('ul').append('<li data-id="' + ab.id + '">' + ab.name + '</li>');
            });
            
            $app.find('li').on('click', function() {
                var addressBookId = $(this).data('id');
                displayAddressBookEntries(addressBookId);
            });
        }
    )
}

function displayAddressBookEntries(addressBookId) {
    getEntries(addressBookId).then(
        function(entries) {
            
            $app.html(''); // Clear the #app div
            $app.append('<h2>Entries</h2>');
            $app.append('<ul>');
            
            addressBooks.forEach(function(ent) {
                $app.find('ul').append('<li data-id="' + ent.id + '">' + ent.name + '</li>');
            });
            
            $app.find('li').on('click', function() {
                var addressBookId = $(this).data('id');
                displayAddressBook(addressBookId);
            });
        }
    )
  
    
}

function displayEntry() {
    
}
// End functions that display views


// Start the app by displaying all the addressbooks
displayAddressBooksList();