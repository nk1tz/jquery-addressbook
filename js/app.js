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

function displayEntry(id) {
    getEntry(id).then(

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
            entryInfo[0].addresses.forEach(function(ad, ind) {
                $app.find('#addresses').append('<li>  Address #' + ind + '</li>');
                $app.find('#addresses').append('<li>' + "line1 :" + ad.line1 + '</li>');
                $app.find('#addresses').append('<li>' + "line2 :" + ad.line2 + '</li>');
                $app.find('#addresses').append('<li>' + "city :" + ad.city + '</li>');
                $app.find('#addresses').append('<li>' + "state :" + ad.state + '</li>');
                $app.find('#addresses').append('<li>' + "zip :" + ad.zip + '</li>');
                $app.find('#addresses').append('<li>' + "country :" + ad.country + '</li>');
                $app.find('#addresses').append('<li>' + "type :" + ad.type + '</li>');
            });
            $app.find('ul').append('<li id="phones">' + "phone(s): " + '</li>');
             entryInfo[0].phones.forEach(function(ph, ind) {
                $app.find('#phones').append('<li>  Phone #' + ind + '</li>');
                $app.find('#phones').append('<li>' + "Phone Number :" + ph.phoneNumber + '</li>');
                $app.find('#phones').append('<li>' + "Type :" + ph.type + '</li>');
                $app.find('#phones').append('<li>' + "Phone Type :" + ph.phoneType + '</li>');
            });
             $app.find('ul').append('<li id="emais">' + "email(s): " + '</li>');
             entryInfo[0].emails.forEach(function(em, ind) {
                $app.find('#emails').append('<li>  Email #' + ind + '</li>');
                $app.find('#emails').append('<li>' + "Email Address :" + em.email + '</li>');
                $app.find('#emails').append('<li>' + "Type :" + em.type + '</li>');
            });
            
        }
    );
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


            AddressBooksListButtons();

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

            AddressBooksListButtons()
