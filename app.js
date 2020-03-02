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

var app = express();
var fs = require("fs")
const multer = require('multer');

//client.set('framework', 'AngularJS');

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



var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads')
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now())
  }
});
// var upload = multer({storage: storage});
// app.post('/fileupload', upload.single('image'), (req, res, next) => {
//   MongoClient.connect(url, (err, db) => {
//     assert.equal(null, err);
//     insertDocuments(db, 'uploads/' + req.file.filename, () => {
//         db.close();
//         res.json({'message': 'File uploaded successfully'});
//     });
// });
// });

var swaggerUi = require('swagger-ui-express'),
swaggerDocument = require('./swagger.json');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

var port = 1234;
app.listen(port, () => {
  console.log('Server is up and running on port number ' + port);
});
module.exports = app;