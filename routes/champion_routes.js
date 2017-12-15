var express = require('express');
var router = express.Router();
var champion_dal = require('../model/champion_dal');


router.get('/all', function(req, res) {
    champion_dal.getAll(function(err, result){
        if(err) {
            res.send(err);
        }
        else {
            res.render('champion/championViewAll', { 'result':result });
        }
    });

});


router.get('/add', function(req, res){
    champion_dal.getAll(function(err,result) {
        if (err) {
            res.send(err);
        }
        else {
            res.render('champion/championAdd', {'team': result});
        }
    });
});

router.get('/insert', function(req, res){
    if(req.query.champion_name == null) {
        res.send('A champion name must be provided.');
    }
    else if(req.query.role == null) {
        res.send('A role must be provided.');
    }

    else {
        champion_dal.insert(req.query, function(err,result) {
            if (err) {
                console.log(err)
                res.send(err);
            }
            else {
                res.send('Success!');
            }
        });
    }
});

router.get('/', function(req, res){
    if(req.query.champion_id == null) {
        res.send('champion_id is null');
    }
    else {
        champion_dal.getById(req.query.champion_id, function(err,result) {
            if (err) {
                res.send(err);
            }
            else {
                res.render('champion/championViewById', {'result': result});
            }
        });
    }
});



module.exports = router;