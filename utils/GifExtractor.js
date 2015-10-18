var gify = require('gify');
var config = require('../config');
var tumblr = require('tumblr.js');

var client = new tumblr.Client({
    consumer_key: process.env.TUMBLR_KEY,
    consumer_secret: process.env.TUMBLR_SECRET,
    token: process.env.ACCESS_TOKEN,
    token_secret: process.env.ACCESS_SECRET
});

var gifExtractor = function(videoModel) {

    if (!videoModel.videoPath) {
        return false;
    }

    var options = {
        width: 300,
        duration: 5,
        rate: 8,
        start: Math.floor(Math.random() * (videoModel.duration - 10)) + 10
    };
    console.log(videoModel);
    console.log(options);

    gify(videoModel.videoPath, config.gif_path + '/' + videoModel.id + '.gif', options, function(err) {
        if (err) {
            throw err;
        }
        client.photo(config.blogname, {
            data: config.gif_path + '/' + videoModel.id + '.gif',
            tags: videoModel.tags.slice(0, 3).join(',')
        }, function() {
            console.log(arguments);
        });
    });
};

module.exports = gifExtractor;
