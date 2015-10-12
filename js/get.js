var API_URL = "https://loopback-rest-api-demo-ziad-saab.c9.io/api";
var $app = $('#app');
var $buttons = $("#buttons");

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