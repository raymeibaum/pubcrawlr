const $resultsSelect = $('select#search-results');
const $searchSubmit = $('button#search-submit');

const $inputName = $('input#address-name');
const $inputStreet = $('input#address-street');
const $inputCity = $('input#address-city');
const $inputState = $('select#address-state');

function getResults(event) {
  event.preventDefault();
  let query = event.currentTarget[0].value;
  let results = new Promise(function(resolve, reject) {
    $.get(`http://localhost:3000/google/search?q=${query}`, function(data) {
      resolve(data.json.results);
    });
  });
  results.then(function(locations) {
    display(locations);
  });
  results.catch(function(err) {
    console.error(err);
  });
}

function display(locations) {
  $resultsSelect.removeAttr('disabled');
  $searchSubmit.removeAttr('disabled');
  locations.forEach(function(location) {
    $resultsSelect.append(`<option class="search-results" data-address="${location.formatted_address}">${location.name}</option`)
  });
}

function moveToForm(event) {
  event.preventDefault();
  let selectedName = $resultsSelect.find(":selected").text();
  let selectedAddress = $resultsSelect.find(":selected").data('address');
  let addressArray = selectedAddress.split(',');
  $inputName.val(selectedName);
  $inputStreet.val(addressArray[0]);
  $inputCity.val(addressArray[1]);

  let splitState = addressArray[2].split(' ');
  $inputState.val(splitState[1]).change();


}

$(function(){
  $('form#location-search').on('submit', getResults);
  $resultsSelect.on('change', moveToForm);
})
