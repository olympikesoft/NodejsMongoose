
var express = require('express');

var router = express.Router();

var ctrlMain = require('../controllers/main');



/* GET home page. */

/*Call Main Controller functions*/
router.get('/', ctrlMain.index);


router.get('/about', ctrlMain.about);



module.exports = router;