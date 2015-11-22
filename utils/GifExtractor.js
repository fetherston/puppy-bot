var gify = require('gify');
var config = require('../config/config');
var tumblr = require('tumblr.js');

var t = new tumblr.Client({
    consumer_key: config.TUMBLR_KEY,
    consumer_secret: config.TUMBLR_SECRET,
    token: config.ACCESS_TOKEN,
    token_secret: config.ACCESS_SECRET
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

    gify(videoModel.videoPath, config.gif_path + '/' + videoModel.id + '.gif', options, function(err) {
        if (err) {
            throw err;
        }
        t.photo(config.blogname, {
            data: config.gif_path + '/' + videoModel.id + '.gif',
            tags: videoModel.tags.slice(0, 3).join(',')
        }, function() {});
    });
};

module.exports = gifExtractor;
