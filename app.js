const express = require('express');
const app = express();

let port = 3000;
app.set('port', port);

app.set('view engine', 'ejs');
app.use(express.static('static'));
var bodyParser = require('body-parser')

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())
require('./router')(app);

app.listen(port, () => console.info(`Listening on port ${port}`));

app.use(function(req, res, next) {
    res.status(404);
    return res.render("404.ejs", {error: "404 - Page not Found"})
});