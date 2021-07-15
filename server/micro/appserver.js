const express = require('express');
var bodyParser = require('body-parser')
const path = require('path');
const AppServer = express();
const MongoClient = require('../db');
const cors = require('cors');
let uri = `mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.MONGO_SERVER}`
if (process.env.type === 'development') {
    uri = `mongodb://${process.env.MONGO_SERVER}`
}
AppServer.use(function(req,res,next){setTimeout(next,1000)});
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
        const query = [{
            $match: {
              userID: req.params.userID
            },
          }, {
            $lookup: {
              from: 'projects',
              localField: 'userID',
              foreignField: 'userID',
              as: 'projects'
            }
          },
          {
            $sort: {
              'tenure.from': 1
            }
          },{
            $limit: 1
          }
        ];
        const result = await MongoInstance.aggregateQuery(query, 'profile')
        res.status(200).send({ result });
    });
    AppServer.get('/api/projects/:userID', async function (req, res) {
        console.log(req.params);
        const result = await MongoInstance.findQuery({ userID: req.params.userID }, 'profile')
        res.status(200).send({ result });
    });
}
module.exports = {
    initialize,
}