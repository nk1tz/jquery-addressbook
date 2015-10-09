// Add foundation dynamic functionality on page
$(document).foundation();

// Set the API base url
var API_URL = "https://loopback-rest-api-demo-ziad-saab.c9.io/api";

// Get a reference to the <div id="app">. This is where we will output our stuff
var $app = $('#app');
var $buttons = $("#buttons")
var $next = $("#next");
var $prev = $("#previous");

// Data retrieval functions
function getAddressBooks(skip) {
    return $.getJSON(API_URL + "/AddressBooks?filter[limit]=5&[order]=id:ASC&filter[skip]=" + skip);
}

function getAddressBook(id) {
    return $.getJSON(API_URL + '/AddressBooks/' + id);
}

function getEntries(addressBookId, offset) {
    return $.getJSON(API_URL + "/Entries?filter[where][addressBookId]=" + addressBookId + "&filter[order]=lastName%20ASC&filter[limit]=5&filter[skip]=" + offset);

}


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
                displayAddressBookEntries(addressBookId, 0);
                AddressBookEntriesButtons(addressBookId);
            });
        }
    )
}

function displayAddressBookEntries(addressBookId, offset) {
    getEntries(addressBookId, offset).then(
        function(entries) {

            $app.html(''); // Clear the #app div
            $app.append('<h2>Entries</h2>');
            $app.append('<ul>');
            console.log(entries)
            entries.forEach(function(ent) {
                console.log(ent)
                $app.find('ul').append('<li data-id="' + ent.id + '"' + ' data-ab="' + ent.addressBookId + '">' + ent.lastName + ", " + ent.firstName + '</li>');
            });

            $app.find('li').on('click', function() {
                var entryId = $(this).data('id');
                var addressBookId = $(this).data('ab');
                displayEntry(entryId);
                entryButtons(addressBookId);
            });
        }
    )


}

function displayEntry(id) {
    getEntry(id).then(
        function(entryInfo) {
            $app.html(''); // Clear the #app div
            $app.append('<h2>Contact Information:</h2>');
            $app.append('<ul id="contact"></ul>');
            $app.find('#contact').append('<li>' + "First Name: " + entryInfo[0].firstName + '</li>');
            $app.find('#contact').append('<li>' + "Lirst Name: " + entryInfo[0].lastName + '</li>');
            $app.find('#contact').append('<li>' + "Birthday: " + entryInfo[0].birthday + '</li>');
            // $app.find('ul').append('<li>' + "id: " + entryInfo[0].id + '</li>');
            // $app.find('ul').append('<li>' + "addressBookId: " + entryInfo[0].addressBookId + '</li>');
            $app.find('#contact').append('<ul id="addresses">' + "address(es): " + '</ul>');
            entryInfo[0].addresses.forEach(function(ad, ind) {
                $app.find('#addresses').append('<li>  Address #' + ind+1 + '</li>');
                $app.find('#addresses').append('<li>' + "line1 :" + ad.line1 + '</li>');
                $app.find('#addresses').append('<li>' + "line2 :" + ad.line2 + '</li>');
                $app.find('#addresses').append('<li>' + "city :" + ad.city + '</li>');
                $app.find('#addresses').append('<li>' + "state :" + ad.state + '</li>');
                $app.find('#addresses').append('<li>' + "zip :" + ad.zip + '</li>');
                $app.find('#addresses').append('<li>' + "country :" + ad.country + '</li>');
                $app.find('#addresses').append('<li>' + "type :" + ad.type + '</li>');
            });
            $app.find('#contact').append('<ul id="phones">' + "phone(s): " + '</ul>');
             entryInfo[0].phones.forEach(function(ph, ind) {
                $app.find('#phones').append('<li>  Phone #' + ind+1 + '</li>');
                $app.find('#phones').append('<li>' + "Phone Number :" + ph.phoneNumber + '</li>');
                $app.find('#phones').append('<li>' + "Type :" + ph.type + '</li>');
                $app.find('#phones').append('<li>' + "Phone Type :" + ph.phoneType + '</li>');
            });
             $app.find('#contact').append('<ul id="emais">' + "email(s): " + '</ul>');
             entryInfo[0].emails.forEach(function(em, ind) {
                $app.find('#emails').append('<li>  Email #' + ind+1 + '</li>');
                $app.find('#emails').append('<li>' + "Email Address :" + em.email + '</li>');
                $app.find('#emails').append('<li>' + "Type :" + em.type + '</li>');
            });
        }
    );
    
}

// End functions that display views


// Start the app by displaying all the addressbooks




function AddressBooksListButtons() {
    var offset = 0
    $buttons.html('');
    $buttons.append('<button id="entryPrev">Display Prev 5</button>');
    $buttons.append('<button id="entryNext">Display Next 5</button>');
    $("#entryNext").on('click', function() {
        offset +=5
        displayAddressBooksList(offset);
    });
    $("#entryPrev").on('click', function() {
    // $("#bookPrev").on('click', function() {
        offset -=5
        if (offset < 0) {
            offset = 0;
        }
        displayAddressBooksList(offset);
    });
}
// End functions that display views


// Start the app by displaying all the addressbooks

// AddressBooksListButtons();

function AddressBookEntriesButtons(addressBookId) {
    var offset = 0
    $buttons.html('');
    $buttons.append('<button id="entryPrev">Display Prev 5</button>');
    $buttons.append('<button id="entryNext">Display Next 5</button>');
    $("#entryNext").on('click', function() {
        offset +=5
        displayAddressBookEntries(addressBookId, offset);
    });
    $("#entryPrev").on('click', function() {
        offset -=5
        if (offset < 0) {
            offset = 0;
        }
        displayAddressBookEntries(addressBookId, offset);
    });
}


function entryButtons(addressBookId) {
    console.log(addressBookId)
    $buttons.html('');
    $buttons.append('<button id="bookList">Return to Address Book List</button>');
    $buttons.append('<button id="entryList">Return to Entry Listing</button>');
    $("#bookList").on('click', function() {
        AddressBooksListButtons()
        displayAddressBooksList(0)
    });
    $("#entryList").on('click', function() {
        AddressBookEntriesButtons(addressBookId);
        displayAddressBookEntries(addressBookId, 0);
    });
}


displayAddressBooksList(0);

AddressBooksListButtons();

