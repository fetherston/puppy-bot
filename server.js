var YouTubeSearcher = require('./searchers/YouTubeSearcher');
var Logger = require('bug-killer');
var gifExtractor = require('./utils/GifExtractor');
var dogs = require('./terms/dogs');
var fs = require('fs-extra');

fs.removeSync('./temp');
fs.mkdirsSync('./temp/gifs');

var onVideoDownloadComplete = function(videoModel) {
    gifExtractor(videoModel);
};

var handleSearch = function(videoModels) {
    var model = videoModels[Math.floor(Math.random() * videoModels.length)];
    Logger.log('Found ' + videoModels.length, 'results.');
    model.download().then(onVideoDownloadComplete);
};

var term = dogs.getRandom();
Logger.log('Searching for ' + term);

var ytSearch = new YouTubeSearcher(term);
ytSearch.search().then(handleSearch, function(err) {
    Logger.log(err, 'error');
});
