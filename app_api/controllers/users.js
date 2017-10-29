var mongoose = require('mongoose');
var express = require("express");
var app = express();
var router = express.Router();



var User = require('../models/users.js');


router.post('/insert', insertUsert);

    function insertUsert(req, res, next){
        const newUser = new User({
            name: req.body.name,
            username: req.body.username, 
            password: req.body.password, 
            admin: false

         })

newUser.save().then(function(user) {

    if(err) res.status(400).json({"message": err})
    res.status(200).json(user)

})
        }
  /*

  router.post('/user/insert', function insertUsert(req, res){
    res.status(200).send("hi");
  });

  */
  

module.exports = router;
