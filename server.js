var grab=require('ps-grab');
grab('--type') // return 'Abdennour'
let type = grab('--type')
require('dotenv').config({ path: `${!!type ? '.' + type : ''}.env` });
const AppServer = require('./server/micro/appserver');
AppServer.initialize();