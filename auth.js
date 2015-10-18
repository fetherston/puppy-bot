var express = require('express');
var session = require('express-session');
var logger = require('morgan');
var os = require('os');
var Grant = require('grant-express');

var config = {
    'server': {
        'protocol': 'http',
        'host': os.hostname + ':' + process.env.PORT
    },
    'tumblr': {
        'key': process.env.TUMBLR_KEY,
        'secret': process.env.TUMBLR_SECRET,
        'callback': '/handle_tumblr_callback'
    }
};

var grant = new Grant(config);

var app = express();
app.use(logger('dev'));
// REQUIRED:
app.use(session({secret: 'very secret'}));
// mount grant
app.use(grant);

app.get('/handle_tumblr_callback', function(req, res) {
    res.end(JSON.stringify(req.query, null, 2));
});

app.listen(process.env.PORT, function() {
    console.log('Express server listening on port ' + process.env.PORT);
});
