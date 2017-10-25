require('dotenv').config();

const express = require('express'),
  app = express(),
  port = process.env.PORT || 3000,
  mongoose = require('mongoose'),
  User = require('./api/models/userModel'),
  cookieParser = require('cookie-parser'),
  bodyParser = require('body-parser'),
  cors = require('cors');
// errorHandler = require('errorhandler');

mongoose.Promise = global.Promise;
mongoose.connect(process.env.CONSTR)
  .then(() => console.log('connect to mongodb successfully!'))
  .catch((err) => console.error(err));

// app.use(cookieParser);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// app.use(errorHandler);

// app.use(function (req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });
app.use(cors());


app.use(express.static(__dirname + '/static/images'));
const routes = require('./api/routes/userRoute');
routes(app);

app.listen(port);
console.log('Social Network RESTful API server started on: ' + port);
