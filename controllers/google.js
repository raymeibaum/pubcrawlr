const express = require('express');
const router = express.Router()

const googleMapsClient = require('@google/maps').createClient({
  key: 'AIzaSyAn-YPeFOabuOn1-LPmJfOTj4UieSMDfOk'
});

router.get('/search', function(req, res) {
  googleMapsClient.places({
    query: req.query.q,
    type: 'bar',
    radius: 5000
  }, function(err, response) {
    res.json(response);
  });
});

module.exports = router
