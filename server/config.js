const config = {};

config.web = {};
config.db = {};


config.web.port = 8080;
config.db.dev_db_url = 'mongodb://root:abcd1234@ds121861.mlab.com:21861/taskmanager';
config.secret = 'supersecret';

module.exports = config;
