var express = require('express');
var router = express.Router();

router.get('/', function(req, res){
    res.render('about/about');
})

router.get('/requirements', function(req, res){
    res.render('about/requirements');
})

module.exports = router;