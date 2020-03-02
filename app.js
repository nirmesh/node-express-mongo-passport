var express = require('express');
var bodyParser = require('body-parser');
//setup security
const cors = require('cors');
const errorHandler = require('errorhandler');
const logger = require('./services/logger');

require('./services/db');

const pr = require('./services/promise');

var product = require('./routes/product'); // Imports routes for the products
var users = require('./routes/users'); // Imports routes for the users
var external_call = require('./routes/external-call');
const rd = require('./routes/redis');

require('./config/passport');
var app = express();
var fs = require("fs")
const multer = require('multer');


app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(errorHandler());

app.use('/products', product);
app.use('/users', users);
app.use('/external-call', external_call);
app.use('/parallel-execution', async (req, resp) => {
  var q = await pr.pr();
  resp.send(q);
});
app.use('/photos', rd);

var swaggerUi = require('swagger-ui-express'),
swaggerDocument = require('./swagger.json');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

var port = 1234;
app.listen(port, () => {
  console.log('Server is up and running on port number ' + port);
});
module.exports = app;