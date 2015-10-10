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
console.log(entries)
            entries.forEach(function(ent) {
                console.log(ent)
                $app.find('ul').append('<li data-id="' + ent.id + '">' + ent.lastName + ", " + ent.firstName + '</li>');
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
            
            EntryEditButton(id);
            
        }
    );
}



function displayEntryEdit(id){
    getEntry(id).then(
        function(entryInfo) {

            $app.html(''); // Clear the #app div
            $app.append('<h2>Contact Information:</h2>');
            $app.append('<ul id="contact"></ul>');
            $app.find('ul').append('<form action="' + API_URL + '/Entries" method="put" enctype="application/json" autocomplete="off" novalidate></form>');
            
            $app.find('form').append('<br>First Name: <br><input type="text" name="firstName" value="' + entryInfo[0].firstName + '">');
            $app.find('form').append('<br>Last Name: <br><input type="text" name="lastName" value="' + entryInfo[0].lastName + '">');
            $app.find('form').append('<br>Birthday: <br><input type="text" name="birthday" value="' + entryInfo[0].birthday + '">');
            $app.find('form').append("<input type='hidden' name='id' value='"+ entryInfo[0].id +"'>");
            $app.find('form').append("<input type='hidden' name='addressBookId' value='"+ entryInfo[0].addressBookId +"'>");
            $app.find('form').append("<input type='submit' style='visibility: hidden;'>");
            
            $('form').submit(function(event){
                alert( event );
                // $.putJSON(API_URL + '/Entries
                event.preventDefault();
                displayEntry(id);
            });
            
            EntryDoneEditButton(id);
            
           
        }
    );
}
//<input type="submit" style="visibility: hidden;" >
//Code for addresses 
/*
 $app.find('form').append('<ul id="addresses">' + "address(es): " + '</ul>');
            entryInfo[0].addresses.forEach(function(ad, ind) {
                $app.find('#addresses').append('<input>  Address #' + ind+1 + '</input>');
                $app.find('#addresses').append('<input>' + "inputne1 :" + ad.inputne1 + '</input>');
                $app.find('#addresses').append('<input>' + "inputne2 :" + ad.inputne2 + '</input>');
                $app.find('#addresses').append('<input>' + "city :" + ad.city + '</input>');
                $app.find('#addresses').append('<input>' + "state :" + ad.state + '</input>');
                $app.find('#addresses').append('<input>' + "zip :" + ad.zip + '</input>');
                $app.find('#addresses').append('<input>' + "country :" + ad.country + '</input>');
                $app.find('#addresses').append('<input>' + "type :" + ad.type + '</input>');
            });
            $app.find('form').append('<ul id="phones">' + "phone(s): " + '</ul>');
             entryInfo[0].phones.forEach(function(ph, ind) {
                $app.find('#phones').append('<input>  Phone #' + ind+1 + '</input>');
                $app.find('#phones').append('<input>' + "Phone Number :" + ph.phoneNumber + '</input>');
                $app.find('#phones').append('<input>' + "Type :" + ph.type + '</input>');
                $app.find('#phones').append('<input>' + "Phone Type :" + ph.phoneType + '</input>');
            });
             $app.find('form').append('<ul id="emais">' + "email(s): " + '</ul>');
             entryInfo[0].emails.forEach(function(em, ind) {
                $app.find('#emails').append('<input>  Email #' + ind+1 + '</input>');
                $app.find('#emails').append('<input>' + "Email Address :" + em.email + '</input>');
                $app.find('#emails').append('<input>' + "Type :" + em.type + '</input>');
             });
*/

function EntryEditButton(entryId){
     $app.append('<button id="edit">EDIT</button>');
     $app.find('#edit').on('click', function(){
        return displayEntryEdit(entryId);
     });
}

function EntryDoneEditButton(entryId){
     $app.append('<button id="doneEdit">Done</button>');
     $app.find('#doneEdit').on('click', function(){
        return displayEntry(entryId);
     });
     
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

