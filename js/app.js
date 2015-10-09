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
}

function getEntry(entryId) {
   return $.getJSON(API_URL + '/Entries?filter[where][id]=' + entryId + '&filter[include]=addresses&filter[include]=phones&filter[include]=emails');
}

// End data retrieval functions

// Functions that display things on the screen (views)
function displayAddressBooksList() {
    getAddressBooks().then(
        function(addressBooks) {
            
            $app.html(''); // Clear the #app div
            $app.append('<h2>Address Books List</h2>');
            $app.append('<ul>');
            
            addressBooks.forEach(function(ab) {
                $app.find('ul').append('<li data-id="' + ab.id + '">' + ab.name + '</li>');
            });
            
            $app.find('li').on('click', function() {
                var addressBookId = $(this).data('id');
                displayAddressBook(addressBookId);
            });
        }
    )
}

function displayAddressBook(addressBookId) {
    
}

function displayEntry() {
    getEntry().then(
        function(entryInfo) {
            
            $app.html(''); // Clear the #app div
            $app.append('<h2>Contact Information:</h2>');
            $app.append('<ul></ul>');
            
            $app.find('ul').append('<li>'+ "First Name: " + entryInfo[0].firstName + '</li>');
            $app.find('ul').append('<li>'+ "Lirst Name: " + entryInfo[0].lastName + '</li>');
            $app.find('ul').append('<li>'+ "Birthday: " + entryInfo[0].birthday + '</li>');
            $app.find('ul').append('<li>'+ "id: " + entryInfo[0].id + '</li>');
            $app.find('ul').append('<li>'+ "addressBookId: " + entryInfo[0].addressBookId + '</li>');
            $app.find('ul').append('<li id="addresses">'+ "address(es): " +'</li>');
            entryInfo[0].addresses.forEach(function(ad) {
                $app.find('#addresses').append('<li data-id="' + ab.id + '">' + ab.name + '</li>');
            });
            
            
}
// End functions that display views


// Start the app by displaying all the addressbooks
displayAddressBooksList();