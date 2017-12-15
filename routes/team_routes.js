var express = require('express');
var router = express.Router();
var team_dal = require('../model/team_dal');
var player_dal = require('../model/player_dal');
var coach_dal = require('../model/coach_dal');


router.get('/all', function(req, res) {
    team_dal.getAll(function(err, result){
        if(err) {
            res.send(err);
        }
        else {
            res.render('team/teamViewAll', { 'result':result });
        }
    });

});

router.get('/', function(req, res){
    if(req.query.team_id == null) {
        res.send('team_id is null');
    }
    else {
        team_dal.getById(req.query.team_id, function(err,result1) {
            player_dal.getByTeamId(req.query.team_id, function(err, result2) {
                coach_dal.getByTeamId(req.query.team_id, function (err, result3) {
                    if (err) {
                        res.send(err);
                    }
                    else {
                        res.render('team/teamViewById', {'team': result1, 'player': result2, 'coach': result3});
                    }
                })
            })
        });
    }
});

router.get('/add', function(req, res){
    // passing all the query parameters (req.query) to the insert function instead of each individually
    team_dal.getAll(function(err,result) {
        if (err) {
            res.send(err);
        }
        else {
            res.render('team/teamAdd', {'team': result});
        }
    });
});

// View the address for the given id
router.get('/insert', function(req, res){
    // simple validation
    if(req.query.team_name == null) {
        res.send('A team name must be provided.');
    }
    else if(req.query.league_name == null) {
        res.send('A league name must be provided.');
    }

    else {
        // passing all the query parameters (req.query) to the insert function instead of each individually
        team_dal.insert(req.query, function(err,result) {
            if (err) {
                console.log(err)
                res.send(err);
            }
            else {
                //poor practice for redirecting the user to a different page, but we will handle it differently once we start using Ajax
                res.send('Success!');
            }
        });
    }
});

router.get('/delete', function(req, res){
    if(req.query.team_id == null) {
        res.send('team_id is null');
    }
    else {
        team_dal.delete(req.query.team_id, function(err, result){
            if(err) {
                res.send(err);
            }
            else {
                //poor practice, but we will handle it differently once we start using Ajax
                res.redirect('Success!');
            }
        });
    }
});

module.exports = router;