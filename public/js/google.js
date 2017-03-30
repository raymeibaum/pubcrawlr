const $resultsSelect = $('select#search-results');
const $inputLocation = $('input#search-location');

const $inputName = $('input#address-name');
const $inputStreet = $('input#address-street');
const $inputCity = $('input#address-city');
const $inputState = $('select#address-state');

const $getLocationButton = $('button#get-current-location');

function getResults(event) {
  event.preventDefault();
  let query = event.currentTarget[0].value;
  let results = new Promise(function(resolve, reject) {
    $.get(`/google/search?q=${query}`, function(data) {
      resolve(data.json.results);
    });
  });
  results.then(function(locations) {
    displayLocationsDropdown(locations);
  });
  results.catch(function(err) {
    console.error(err);
  });
}

function displayLocationsDropdown(locations) {
  $resultsSelect.empty();
  $resultsSelect.removeAttr('disabled');
  locations.forEach(function(location) {
    $resultsSelect.append(`<option class="search-results" data-address="${location.formatted_address}">${location.name}</option`);
  });
}

function moveToForm(event) {
  event.preventDefault();

  // Getting the address data required from data-address attribute and breaking it up
  let selectedName = $resultsSelect.find(":selected").text();
  let selectedAddress = $resultsSelect.find(":selected").data('address');
  let addressArray = selectedAddress.split(',');
  $inputName.val(selectedName);
  $inputStreet.val(addressArray[0]);
  $inputCity.val(addressArray[1]);

  let splitState = addressArray[2].split(' ');
  $inputState.val(splitState[1]).change();
}

function getLocation() {
  let retrieveLocation = new Promise(function(resolve, reject) {
    $inputLocation.val('Retrieving location..');
    navigator.geolocation.getCurrentPosition(function(position) {
      resolve(position.coords);
    }, function() {
      reject();
    });
  });
  retrieveLocation.then(function(coords){
    $.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${coords.latitude},${coords.longitude}&key=AIzaSyAn-YPeFOabuOn1-LPmJfOTj4UieSMDfOk`, function(data) {
      $inputLocation.val(data.results[0].formatted_address);
    });
  });
  retrieveLocation.catch(function() {
    $inputLocation.val('Location could not be determined');
  });
}

$(function(){
  $('form#location-search').on('submit', getResults);
  $resultsSelect.on('change', moveToForm);
  if ("geolocation" in navigator) {
    $getLocationButton.on('click', getLocation);
  } else {
    $getLocationButton.attr('disabled', 'true');
  }
});
