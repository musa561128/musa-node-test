var http = require('http');
var path = require('path');
var morgan = require('morgan');
var express = require('express');
var bodyParser = require('body-parser');
const PORT = process.env.PORT || 5000

var app = express();

app.use(morgan("combined"));
app.use("/static", express.static(path.join(__dirname, "static")));

app.use(bodyParser.urlencoded({extended: false}));

app.set('views', path.join(__dirname, 'templates'));
app.set('view engine', 'ejs');

app.get("/", function(req, res){
    return res.render("index");
});

app.post("/" ,function(req, res){
    return res.render("result",{username: req.body.username, message: req.body.message})
});
app.listen(PORT, () => console.log(`Listening on ${ PORT }`));

// var server = http.createServer(app);
// server.listen(3000);
