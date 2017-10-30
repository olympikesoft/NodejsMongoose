var mongoose = require('mongoose');
var router = require("express").Router();

var User = require('../models/users.js');

router.post('/insert', insertUsert);

function insertUsert(req, res) {

  const newUser = new User({
    name: req.body.name,
    username: req.body.username, 
    password: req.body.password, 
    admin: false
  })

  newUser.save(function(err) {
    if(err)
      return res.status(400).json(err)
    return res.status(200).json(newUser)

  })
}

module.exports = router;
