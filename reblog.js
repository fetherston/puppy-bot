var gify = require('gify');
var config = require('../config');
var tumblr = require('tumblr.js');

var client = new tumblr.Client({
    consumer_key: process.env.TUMBLR_KEY,
    consumer_secret: process.env.TUMBLR_SECRET,
    token: process.env.ACCESS_TOKEN,
    token_secret: process.env.ACCESS_SECRET
});

