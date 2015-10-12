$(document).foundation();

// Set the API base url
// var API_URL = "https://loopback-rest-api-demo-ziad-saab.c9.io/api";

// Get a reference to the <div id="app">. This is where we will output our stuff
var $app = $('#app');
var $buttons = $("#buttons");
var getFunctions = require('./get');
var displayFunctions = require("./display");

function EntryEditButton(entryId){
     $app.append('<button id="edit">EDIT</button>');
     $app.find('#edit').on('click', function(){
        return displayEntryEdit(entryId);
     });
}

function EntryDoneEditButton(entryId){
     $app.append('<button id="cancelEdit">Cancel</button>');
     $app.find('#cancelEdit').on('click', function(){
        return displayFunctions.displayEntry(entryId);
     });
     
}

function AddressBooksListButtons() {
    getFunctions.getCount("/addressBooks").then(
        function(count) {
            var offset = 0;
            var limit = count;
            $buttons.html('');
            $buttons.append('<button id="prev">Previous 5 Books</button>');
            $buttons.append('<button id="next">Next 5 Books</button>');
            $("#prev").prop({
                disabled: true
            })
            if (offset + 5 >= limit) {
                $("#next").prop({
                    disabled: true
                });
            }
            $("#next").on('click', function() {
                $("#prev").prop({
                    disabled: false
                })
                offset += 5;
                if (offset + 5 >= limit) {
                    $(this).prop({
                        disabled: true
                    });
                }
                displayFunctions.displayAddressBooksList(offset);
            });
            $("#prev").on('click', function() {
                offset -= 5;
                if (offset >= 0) {
                    $("#next").prop({
                        disabled: false
                    })
                }
                if (offset - 5 < 0) {
                    $("#prev").prop({
                        disabled: true
                    })
                }
                displayFunctions.displayAddressBooksList(offset);
            });
        });
}

function AddressBookEntriesButtons(addressBookId) {
    getFunctions.getCount("/Entries?filter[where][addressBookId]=" + addressBookId).then(
        function(count) {
            var limit = count;
            var offset = 0;
            $buttons.html('');
            $buttons.append('<button id="prev">Previous 5 Entries</button>');
            $buttons.append('<button id="back">Back</button>');
            $buttons.append('<button id="next">Next 5 Entries</button>');
            if (offset + 5 >= limit) {
                $("#next").prop({
                    disabled: true
                });
            }
            $("#prev").prop({
                disabled: true
            });
            $("#next").on('click', function() {
                $("#prev").prop({
                    disabled: false
                });
                offset += 5;
                if (offset + 5 >= limit) {
                    $(this).prop({
                        disabled: true
                    });
                }
                displayFunctions.displayAddressBookEntries(addressBookId, offset);
            });
            $("#prev").on('click', function() {
                offset -= 5;
                if (offset >= 0) {
                    $("#next").prop({
                        disabled: false
                    });
                }
                if (offset - 5 < 0) {
                    $("#prev").prop({
                        disabled: true
                    });
                }
                displayFunctions.displayAddressBookEntries(addressBookId, offset);
            });
            $("#back").on('click', function() {
                displayFunctions.displayAddressBooksList(0);
                AddressBooksListButtons();
            });
        });
}

function entryButtons(addressBookId) {
    $buttons.html('');
    $buttons.append('<button id="next">View Address Books</button>');
    $buttons.append('<button id="prev">View Entry Listing</button>');
    $("#next").on('click', function() {
        AddressBooksListButtons();
        displayFunctions.displayAddressBooksList(0);
    });
    $("#prev").on('click', function() {
        AddressBookEntriesButtons(addressBookId);
        displayFunctions.displayAddressBookEntries(addressBookId, 0);
    });
}


//this starts the program by calling the function to list the
//address book entries and add the buttons to the DOM


module.exports = {
    EntryEditButton: EntryEditButton,
    EntryDoneEditButton: EntryDoneEditButton,
    AddressBooksListButtons: AddressBooksListButtons,
    AddressBookEntriesButtons: AddressBookEntriesButtons,
    entryButtons: entryButtons
}