var express = require('express');
var app = express();
var MongoClient = require('mongodb').MongoClient
    , format = require('util').format;



app.get('/api/v1/card', function(req, res){
    MongoClient.connect('mongodb://127.0.0.1:27017/test', function(err, db) {
        if(err) throw err;

        var cards = db.collection('cards');
        var limit = ('count' in req.query) ? req.query.count : 1;

        /*cards.findAndModify({'views.user_id': {$ne: 2}},[], {$push: {'views': {'user_id': 1}}}, {}, function(err, results) {
            if (!results) {
               res.send([]);
            }
            res.send([{
                'id': results._id,
                'content': results.content,
                'image': results.image
            }]);
            db.close();

        });*/
        cards.find({},{skip:getRandomInt(1, 100), limit:limit}).toArray(function(err, cards) {
            res.send(cards);
            db.close();

        });
    });


});

var server = app.listen(80, function() {
    console.log('Listening on port %d', server.address().port);
});


function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}