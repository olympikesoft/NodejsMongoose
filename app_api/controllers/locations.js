var mongoose = require('mongoose');
var express = require("express");
var app = express();
var router = express.Router();
var Loc = require('../models/locations.js');



var sendJSONresponse = function(res, status, content) {

  res.status(status);

  res.json(content);

};



var theEarth = (function() {

  var earthRadius = 6371; // km, miles is 3959



  var getDistanceFromRads = function(rads) {

    return parseFloat(rads * earthRadius);

  };



  var getRadsFromDistance = function(distance) {

    return parseFloat(distance / earthRadius);

  };



  return {

    getDistanceFromRads: getDistanceFromRads,

    getRadsFromDistance: getRadsFromDistance

  };

})();



/* GET list of locations */

router.get('/locations', function locationsListByDistance(req, res) {

  var lng = parseFloat(req.query.lng);

  var lat = parseFloat(req.query.lat);

  var maxDistance = parseFloat(req.query.maxDistance);

  var point = {

    type: "Point",

    coordinates: [lng, lat]

  };

  var geoOptions = {

    spherical: true,

    maxDistance: theEarth.getRadsFromDistance(maxDistance),

    num: 10

  };

  if (!lng || !lat || !maxDistance) {

    console.log('locationsListByDistance missing params');

    res.status(404).send("error");

    return;

  }

  Loc.geoNear(point, geoOptions, function(err, results, stats) {


    var locations;

    console.log('Geo Results', results);

    console.log('Geo stats', stats);

    if (err) {

      console.log('geoNear error:', err);

      res.status(200).send(error);
      

    } else {

      locations = buildLocationList(req, res, results, stats);

      res.status(200).send(locations);

    }

  
 
});
});




var buildLocationList = function(req, res, results, stats) {


  var locations = [];

  results.forEach(function(doc) {

    locations.push({

      distance: theEarth.getDistanceFromRads(doc.dis),

      name: doc.obj.name,

      address: doc.obj.address,

      rating: doc.obj.rating,

      facilities: doc.obj.facilities,

      _id: doc.obj._id

    });

  });


  return locations;
  

};


router.get('/get/count', function locationsCount(req, res){
  var array = [];
  Loc.find().exec(function (err, results) {
    var count = results.length
    
    if(count > 0){

   return res.status(200).send(count);


    }else{
    return  res.status(404).send('Not found');
      
    }
  
  });

});


/* GET a location by the id */

router.get('/locations/:locationid', function locationsReadOne (req, res) {

  console.log('Finding location details', req.params);

  if (req.params && req.params.locationid) {

    Loc

      .findById(req.params.locationid)

      .exec(function(err, location) {

        if (!location) {

        return  sendJSONresponse(res, 404, {

            "message": "locationid not found"

          });


        } else if (err) {

          console.log(err);

        return sendJSONresponse(res, 404, err);


        }

        console.log(location);

       return  sendJSONresponse(res, 200, location);

      });

  } else {

    console.log('No locationid specified');

    return sendJSONresponse(res, 404, {

      "message": "No locationid in request"

    });

  }

});


/* POST a new location */

/* /api/locations */

router.post('/locations',function locationsCreate (req, res) {

  console.log(req.body);

  Loc.create({

    name: req.body.name,

    address: req.body.address,

    facilities: req.body.facilities.split(","),

    coords: [parseFloat(req.body.lng), parseFloat(req.body.lat)],

    openingTimes: [{

      days: req.body.days1,

      opening: req.body.opening1,

      closing: req.body.closing1,

      closed: req.body.closed1,

    }, {

      days: req.body.days2,

      opening: req.body.opening2,

      closing: req.body.closing2,

      closed: req.body.closed2,

    }]

  }, function(err, location) {

    if (err) {

      console.log(err);

      sendJSONresponse(res, 400, err);

    } else {

      console.log(location);

      sendJSONresponse(res, 201, location);

    }

  });

});



module.exports = router;

