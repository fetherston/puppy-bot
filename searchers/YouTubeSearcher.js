var YouTube = require('youtube-node');
var _ = require('lodash');
var Q = require('q');

var config = require('../config');
var VideoModel = require('../models/VideoModel');

var YouTubeSearcher = function(term, options) {
    this.defaults = {
        count: 15,
        // https://developers.google.com/youtube/v3/docs/search/list#optional-parameters
        order: 'relevance',
        videoDuration: 'short'
    };
    this.options = {};
    this.options = _.defaults(options || {}, this.defaults);
    this.term = term;
    this.models = [];
};

YouTubeSearcher.prototype.search = function() {
    var youTube = new YouTube();
    var deferred = Q.defer();
    youTube.setKey(config.app_key);
    youTube.addParam('order', this.options.order);
    youTube.addParam('type', 'video');
    youTube.addParam('videoDuration', this.options.videoDuration);

    youTube.search(this.term, this.options.count, _.bind(function(err, result) {
        if (err) {
            deferred.reject(err);
            return;
        }
        _.each(result.items, function(item) {
            this.models.push(new VideoModel({
                type: 'youtube',
                title: item.snippet.title,
                id: item.id.videoId,
                url: 'http://www.youtube.com/watch?v=' + item.id.videoId
            }));
        }, this);
        deferred.resolve(this.models);
    }, this));

    return deferred.promise;
};

module.exports = YouTubeSearcher;