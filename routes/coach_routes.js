var express = require('express');
var router = express.Router();
var coach_dal = require('../model/coach_dal');


router.get('/all', function(req, res) {
    coach_dal.getAll(function(err, result){
        if(err) {
            res.send(err);
        }
        else {
            res.render('coach/coachViewAll', { 'result':result });
        }
    });

});

router.get('/', function(req, res){
    if(req.query.team_id == null) {
        res.send('team_id is null');
    }
    else {
        coach_dal.getById(req.query.team_id, function(err,result) {
            if (err) {
                res.send(err);
            }
            else {
                res.render('coach/coachViewById', {'result': result});
            }
        });
    }
});

module.exports = router;