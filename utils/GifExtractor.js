var gify = require('gify');
var config = require('../config');
var tumblr = require('tumblr.js');

var client = new tumblr.Client({
    consumer_key: config.tumblr_key,
    consumer_secret: config.tumblr_secret,
    token: config.tumblr_auth.access_token,
    token_secret: config.tumblr_auth.access_secret
});

var gifExtractor = function(videoModel) {

    if (!videoModel.videoPath) {
        return false;
    }

    var options = {
        width: 550,
        duration: 5,
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
