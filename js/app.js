// Add foundation dynamic functionality on page
$(document).foundation();

// Set the API base url
var API_URL = "https://loopback-rest-api-demo-ziad-saab.c9.io/api";

// Get a reference to the <div id="app">. This is where we will output our stuff
var $app = $('#app');
var $next = $("#next");
var $prev = $("#previous");

// Data retrieval functions
function getAddressBooks(skip) {
    return $.getJSON(API_URL + "/AddressBooks?filter[limit]=5&[order]=id:ASC&filter[skip]=" + skip);
}

function getAddressBook(id) {
    return $.getJSON(API_URL + '/AddressBooks/' + id);
}

function getEntries(addressBookId) {
    // TODO...
    return $.getJSON(API_URL + "/Entries?filter[where][addressBookId]=" + addressBookId + "&filter[order]=lastName%20ASC&filter[limit]=5");

}

console.log(getEntries(2));

function getEntry(entryId) {

    return $.getJSON(API_URL + '/Entries?filter[where][id]=' + entryId + '&filter[include]=addresses&filter[include]=phones&filter[include]=emails');

}

// End data retrieval functions

// Functions that display things on the screen (views)
//this function works
function displayAddressBooksList(skip) {
    getAddressBooks(skip).then(
        function(addressBooks) {
            // console.log(addressBooks);
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

            entries.forEach(function(ent) {
                $app.find('ul').append('<li data-id="' + ent.id + '">' + ent.name + '</li>');
            });

            $app.find('li').on('click', function() {
                var addressBookId = $(this).data('id');
                displayEntry(addressBookId);
            });
        }
    )


}

function displayEntry() {
    getEntry().then(
        function(entryInfo) {

            $app.html(''); // Clear the #app div
            $app.append('<h2>Contact Information:</h2>');
            $app.append('<ul></ul>');

            $app.find('ul').append('<li>' + "First Name: " + entryInfo[0].firstName + '</li>');
            $app.find('ul').append('<li>' + "Lirst Name: " + entryInfo[0].lastName + '</li>');
            $app.find('ul').append('<li>' + "Birthday: " + entryInfo[0].birthday + '</li>');
            $app.find('ul').append('<li>' + "id: " + entryInfo[0].id + '</li>');
            $app.find('ul').append('<li>' + "addressBookId: " + entryInfo[0].addressBookId + '</li>');
            $app.find('ul').append('<li id="addresses">' + "address(es): " + '</li>');
            entryInfo[0].addresses.forEach(function(ab) {
                $app.find('#addresses').append('<li data-id="' + ab.id + '">' + ab.name + '</li>');
            });


        })
}
// End functions that display views


// Start the app by displaying all the addressbooks

// AddressBooksListButtons();

function AddressBooksListButtons() {
    $next.html(''); // Clear the #next div
    $prev.html(''); // Clear the #prev div
    $next.text("Display Next 5");
    $prev.text("Display Prev 5");
    $next.on('click', function() {
        var $skip = $app.find('li:last-child')
        var $id = $skip.data('id')
        return displayAddressBooksList($id);
    })
    $prev.on('click', function() {
        var $skip = $app.find('li:first-child')
        var $id = $skip.data('id');
        return displayAddressBooksList($id - 5);
    })

}

displayAddressBooksList(0);
AddressBooksListButtons()