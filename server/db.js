const mongoose = require ('mongoose');
const config = require('./config');

let mongoDB = process.env.MONGODB_URI || config.db.dev_db_url;
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
