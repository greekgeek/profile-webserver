const express = require('express');
var bodyParser = require('body-parser')
const path = require('path');
const AppServer = express();
const MongoClient = require('../db');
const cors = require('cors');
const MongoSever = 'portfolio-webapp.mongo.cosmos.azure.com:10255/?ssl=true&replicaSet=globaldb&retrywrites=false&maxIdleTimeMS=120000&appName=@portfolio-webapp@';
const uri = `mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@${MongoSever}`
console.log(uri);
AppServer.use(cors());
AppServer.use(express.static(path.join(__dirname, 'build')));
AppServer.use(bodyParser.json())
function initialize() {
    const MongoInstance = new MongoClient({ uri });
    MongoInstance.connect();
    const App = AppServer.listen(process.env.SERVER_PORT, function () {
        console.log(App.address().address);
        console.log('My site started at http://%s:%s', process.env.HOST, process.env.SERVER_PORT);
    });
    AppServer.get('/api/profile/:userID', async function (req, res) {
        console.log(req.params);
        const result = await MongoInstance.findQuery({ userID: req.params.userID }, 'profile')
        res.status(200).send({ result });
    });
}
module.exports = {
    initialize,
}