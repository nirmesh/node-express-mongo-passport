// app.js

var express = require('express');
var bodyParser = require('body-parser');
//setup security
const session = require('express-session');
const cors = require('cors');
const errorHandler = require('errorhandler');


var product = require('./routes/product'); // Imports routes for the products
var users = require('./routes/users'); // Imports routes for the users
require('./config/passport');
var app = express();


// Set up mongoose connection
var mongoose = require('mongoose');
var dev_db_url = 'mongodb://localhost:27017/productstutorial';
var mongoDB = process.env.MONGODB_URI || dev_db_url;
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(session({ secret: 'passport-tutorial', cookie: { maxAge: 60000 }, resave: false, saveUninitialized: false }));
app.use(errorHandler());




app.use('/products', product);
app.use('/users', users);


var swaggerUi = require('swagger-ui-express'),
swaggerDocument = require('./swagger.json');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

var port = 1234;

app.listen(port, () => {
    console.log('Server is up and running on port number ' + port);
});
