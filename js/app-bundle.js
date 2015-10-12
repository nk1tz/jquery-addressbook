/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	// Add foundation dynamic functionality on page
	$(document).foundation();

	// Set the API base url
	// var API_URL = "https://loopback-rest-api-demo-ziad-saab.c9.io/api";

	// Get a reference to the <div id="app">. This is where we will output our stuff
	var $app = $('#app');
	var $buttons = $("#buttons");

	var getFunctions = __webpack_require__(1);
	var displayFunctions = __webpack_require__(2);


	displayFunctions.displayAddressBooksList(0);
	displayFunctions.AddressBooksListButtons();


/***/ },
/* 1 */
/***/ function(module, exports) {

	// Add foundation dynamic functionality on page
	$(document).foundation();

	// Set the API base url
	var API_URL = "https://loopback-rest-api-demo-ziad-saab.c9.io/api";

	// Get a reference to the <div id="app">. This is where we will output our stuff


	// Data retrieval functions
	function getAddressBooks(skip) {
	    return $.getJSON(API_URL + "/AddressBooks?filter[limit]=5&[order]=id:ASC&filter[skip]=" + skip);
	}


	function getEntries(addressBookId, offset) {
	    return $.getJSON(API_URL + "/Entries?filter[where][addressBookId]=" + addressBookId + "&filter[order]=lastName%20ASC&filter[limit]=5&filter[skip]=" + offset);

	}


	function getEntry(entryId) {
	    return $.getJSON(API_URL + '/Entries?filter[where][id]=' + entryId + '&filter[include]=addresses&filter[include]=phones&filter[include]=emails');
	}

	function getCount(query) {
	    return $.getJSON(API_URL + query).then(
	        function(results) {
	            var count = Object.keys(results).length;
	            return count;
	        });
	}

	module.exports = {
	    getAddressBooks: getAddressBooks,
	    getEntries: getEntries,
	    getEntry: getEntry,
	    getCount: getCount
	}; 


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var $app = $('#app');
	var $buttons = $("#buttons");
	var getFunctions = __webpack_require__(1);
	var API_URL = "https://loopback-rest-api-demo-ziad-saab.c9.io/api";


	function displayAddressBooksList(skip) {
	    getFunctions.getAddressBooks(skip).then(
	        function(addressBooks) {

	            $app.html('');


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
	    getFunctions.getEntries(addressBookId, offset).then(
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
	    getFunctions.getEntry(id).then(
	        function(entryInfo) {
	            $app.html(''); // Clear the #app div
	            $app.append('<h2>Contact Information:</h2>');
	            $app.append('<ul id="contact"></ul>');

	            $app.find('#contact').append('<li>' + "First Name: " + entryInfo[0].firstName + '</li>');
	            $app.find('#contact').append('<li>' + "Lirst Name: " + entryInfo[0].lastName + '</li>');
	            $app.find('#contact').append('<li>' + "Birthday: " + entryInfo[0].birthday + '</li>');
	            $app.find('#contact').append('<ul id="addresses">' + "address(es): " + '</ul>');
	            entryInfo[0].addresses.forEach(function(ad, ind) {

	                $app.find('#addresses').append('<li>  Address #' + ind + 1 + '</li>');

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
	                $app.find('#phones').append('<li>  Phone #' + ind + 1 + '</li>');

	                $app.find('#phones').append('<li>' + "Phone Number :" + ph.phoneNumber + '</li>');
	                $app.find('#phones').append('<li>' + "Type :" + ph.type + '</li>');
	                $app.find('#phones').append('<li>' + "Phone Type :" + ph.phoneType + '</li>');
	            });

	            $app.find('#contact').append('<ul id="emais">' + "email(s): " + '</ul>');
	            entryInfo[0].emails.forEach(function(em, ind) {
	                $app.find('#emails').append('<li>  Email #' + ind + 1 + '</li>');
	                $app.find('#emails').append('<li>' + "Email Address :" + em.email + '</li>');
	                $app.find('#emails').append('<li>' + "Type :" + em.type + '</li>');
	            });
	            EntryEditButton(id);
	        }
	    );


	}


	function displayEntryEdit(id) {
	    getFunctions.getEntry(id).then(
	        function(entryInfo) {

	            $app.html(''); // Clear the #app div
	            $app.append('<h2>Contact Information:</h2>');
	            $app.append('<ul id="contact"></ul>');
	            $app.find('ul').append('<form action="' + API_URL + '/Entries" method="put" enctype="application/json" autocomplete="off" novalidate></form>');

	            $app.find('form').append('<br>First Name: <br><input type="text" name="firstName" value="' + entryInfo[0].firstName + '">');
	            $app.find('form').append('<br>Last Name: <br><input type="text" name="lastName" value="' + entryInfo[0].lastName + '">');
	            $app.find('form').append('<br>Birthday: <br><input type="text" name="birthday" value="' + entryInfo[0].birthday + '">');
	            $app.find('form').append("<input type='hidden' name='id' value='" + entryInfo[0].id + "'>");
	            $app.find('form').append("<input type='hidden' name='addressBookId' value='" + entryInfo[0].addressBookId + "'>");
	            $app.find('form').append("<input type='submit' onClick='submitForm()' style='visibility: hidden;'/>");

	            $(function submitForm() {
	                //hang on event of form with id=myform
	                $("form").submit(function(e) {
	                    e.preventDefault();
	                    var actionurl = e.currentTarget.action;
	                    $.ajax({
	                            url: actionurl,
	                            type: 'put',
	                            dataType: 'json',
	                            data: $("form").serialize(),
	                            success: function(data) {}
	                        })
	                        .then(displayEntry.bind(null, id));
	                });
	            });

	            cancelEntryEditButton(id);
	            addAddress(id)

	        });
	}

	function addAddress(id) {

	    $app.append('<button id="addAddress">ADD</button>');
	    $app.find('#addAddress').on('click', function() {
	        return popupFormAddress();
	    });

	    function popupFormAddress() {
	        
	        
	        
	        $(function submitForm() {
	                //hang on event of form with id=myform
	                $("form").submit(function(e) {
	                    e.preventDefault();
	                    var actionurl = e.currentTarget.action;
	                    $.ajax({
	                            url: actionurl,
	                            type: 'put',
	                            dataType: 'json',
	                            data: $("form").serialize(),
	                            success: function(data) {}
	                        })
	                        .then(displayEntry.bind(null, id));
	                });
	            });
	    }

	}

	function EntryEditButton(entryId) {
	    $app.append('<button id="edit">EDIT</button>');
	    $app.find('#edit').on('click', function() {
	        return displayEntryEdit(entryId);
	    });
	}

	function cancelEntryEditButton(entryId) {
	    $app.append('<button id="cancelEdit">Cancel</button>');
	    $app.find('#cancelEdit').on('click', function() {
	        return displayEntry(entryId);
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
	                displayAddressBooksList(offset);
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
	                displayAddressBooksList(offset);
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
	                displayAddressBookEntries(addressBookId, offset);
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
	                displayAddressBookEntries(addressBookId, offset);
	            });
	            $("#back").on('click', function() {
	                displayAddressBooksList(0);
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
	        displayAddressBooksList(0);
	    });
	    $("#prev").on('click', function() {
	        AddressBookEntriesButtons(addressBookId);
	        displayAddressBookEntries(addressBookId, 0);
	    });
	}


	//this starts the program by calling the function to list the
	//address book entries and add the buttons to the DOM


	module.exports = {
	    EntryEditButton: EntryEditButton,
	    cancelEntryEditButton: cancelEntryEditButton,
	    AddressBooksListButtons: AddressBooksListButtons,
	    AddressBookEntriesButtons: AddressBookEntriesButtons,
	    entryButtons: entryButtons
	}


	module.exports = {
	    displayAddressBooksList: displayAddressBooksList,
	    displayAddressBookEntries: displayAddressBookEntries,
	    displayEntry: displayEntry,
	    displayEntryEdit: displayEntryEdit
	}

/***/ }
/******/ ]);