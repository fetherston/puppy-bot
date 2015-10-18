var express = require('express');
var session = require('express-session');
var logger = require('morgan');
var Grant = require('grant-express');
var grant = new Grant(require('./config.json'));

var app = express();
app.use(logger('dev'));
// REQUIRED:
app.use(session({secret: 'very secret'}));
// mount grant
app.use(grant);

app.get('/handle_tumblr_callback', function(req, res) {
    res.end(JSON.stringify(req.query, null, 2));
});

app.listen(3000, function() {
    console.log('Express server listening on port ' + 3000);
});