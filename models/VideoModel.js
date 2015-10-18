var fs = require('fs');
var ytdownload = require('youtube-dl');
var _ = require('lodash');
var Q = require('q');

var VideoModel = function(data) {
    this.title = data.title;
    this.tags = data.tags;
    this.type = data.type;
    this.id = data.id;
    this.sourceUrl = data.url ? data.url : null;
    this.videoPath = data.videoPath ? data.videoPath : null;
};

VideoModel.prototype.download = function() {
    var deferred = Q.defer();
    if (this.type === 'youtube') {
        var video = ytdownload(this.sourceUrl, ['--format=135']);
        var path = './temp/ytvideo-' + this.id + '.mp4';
        video.on('info', _.bind(function(info) {
            console.log('Download started');
            console.log('filename: ' + info.filename);
            console.log('size: ' + info.size);
            console.log('length: ' + info.duration);
            // there's some useful bits in here
            if (info.duration.indexOf(':') > -1) {
                var minutes = parseInt(info.duration.split(':')[0], 10);
                var seconds = parseInt(info.duration.split(':')[1], 10);
                this.duration = (minutes * 60) + seconds;
            } else {
                this.duration = parseInt(info.duration, 10);
            }

            this.tags = info.tags;
        }, this));

        video.on('error', deferred.reject);
        video.on('end', _.bind(function() {
            this.videoPath = path;
            deferred.resolve(this);
        }, this));

        video.pipe(fs.createWriteStream(path));
    } else {
        deferred.reject('Type not supported for download');
        return false;
    }
    return deferred.promise;
};

module.exports = VideoModel;
