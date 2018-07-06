const express     = require('express');
const bodyParser  = require('body-parser');
const db          = require('./db');
const config      = require('./config');

const task = require('./routes/task.route');
const user = require('./routes/user.route');
const auth = require('./routes/auth.route');

const app = express();

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-access-token");
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use('/task', task);
app.use('/user', user);
app.use('/auth', auth);

app.listen(config.web.port, () => {
  console.log('Server is up and running on port number ' + config.web.port);
});
