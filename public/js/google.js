let $barContainer = $('div#bar-container');
let $barList = $('ul#bar-list');

function getResults(event) {
  event.preventDefault();
  $barList.empty();
  let query = event.currentTarget[0].value;
  console.log(query);
  let results = new Promise(function(resolve, reject) {
    $.get(`http://localhost:3000/google/search?q=${query}`, function(data) {
      resolve(data.json.results);
    });

  })
  results.then(function(locations) {
    display(locations);
  })
  results.catch(function(err) {
    console.error(err);
  })
}

function display(locations) {
  $barContainer.prepend('<h3>Search results</h3>');
  locations.forEach(function(location) {
    let $bar = $('<li>').text(location.name);
    $barList.append($bar);
  });
}

$(function(){
  $('form#location-search').on('submit', getResults);
})
