var config = require('./config/config');
var tumblr = require('tumblr.js');
var dogs = require('./terms/dogs');

var t = new tumblr.Client({
    consumer_key: config.TUMBLR_KEY,
    consumer_secret: config.TUMBLR_SECRET,
    token: config.ACCESS_TOKEN,
    token_secret: config.ACCESS_SECRET
});

var count = 3;
var iterations = 0;

(function like() {
    t.tagged(dogs.random(), function(iDontKnowWtfThisIs, posts) {
        var post = posts[Math.floor(Math.random() * posts.length)];
        t.like(post.id, post.reblog_key, function() {});
    });
    iterations++;
    if (iterations < count) {
        like();
    }
}());
