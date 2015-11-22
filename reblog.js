var config = require('./config/config');
var tumblr = require('tumblr.js');
var dogs = require('./terms/dogs');

var t = new tumblr.Client({
    consumer_key: config.TUMBLR_KEY,
    consumer_secret: config.TUMBLR_SECRET,
    token: config.ACCESS_TOKEN,
    token_secret: config.ACCESS_SECRET
});

t.tagged(dogs.random() + ' gif', {limit: 5}, function(iDontKnowWtfThisIs, posts) {
    var post = posts[Math.floor(Math.random() * posts.length)];
    t.reblog(config.blogname, {
        id: post.id,
        reblog_key: post.reblog_key
    }, function() {});
});

