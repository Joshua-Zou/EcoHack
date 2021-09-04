const express = require('express');
const app = express();

let port = 3000;
app.set('port', port);

app.set('view engine', 'ejs');
app.use(express.static('static'));

require('./router')(app);

app.listen(port, () => console.info(`Listening on port ${port}`));
