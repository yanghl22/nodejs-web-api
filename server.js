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
mongoose.connect('mongodb://yanghl22:yhl22578685@ds231725.mlab.com:31725/mongo-hl')
  .then(() => console.log('connect to mongodb successfully!'))
  .catch((err) => console.error(err));

// app.use(cookieParser);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// app.use(errorHandler);

app.use(cors());
// app.use(function (req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });

app.use(express.static(__dirname + '/static/images'));
const routes = require('./api/routes/userRoute');
routes(app);

app.listen(port);
console.log('Social Network RESTful API server started on: ' + port);
