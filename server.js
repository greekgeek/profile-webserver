require('dotenv').config({ path: '.env' });
const AppServer = require('./server/micro/appserver');
AppServer.initialize();