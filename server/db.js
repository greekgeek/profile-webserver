const MongoDB = require('mongodb').MongoClient;
// Connect using MongoClient
function MongoDBClient(params) {
    this.isConnected = false;
    this.uri = params.uri;
    this.client = null;
    this.dbName = 'portfolio';
}
console.log('aggregateQuery');
MongoDBClient.prototype.aggregateQuery = async function(query, collection) {
  try {
    var client = await this.connect();
    const db = client.db(this.dbName);
    var result = await db.collection(collection).aggregate(query).toArray();
  } catch(e) {
    console.log('Error in Aggregate Query', e.message);
  }
  if (client) {
    console.log('Closed Connections:: DB');
    client.close()
  }
  return result;
}
MongoDBClient.prototype.findQuery = async function (query, collection) {
  try {
    var client = await this.connect();
    const db = client.db(this.dbName);
    var result = await db.collection(collection).find(query).toArray();
  } catch(e) {
    console.log('Error in Aggregate Query', e.message);
  }
  if (client) {
    client.close()
  }
  return result;
}
MongoDBClient.prototype.connect = async function() {
  const client = await MongoDB.connect(this.uri, { useUnifiedTopology: true });
  return client;
}
module.exports = MongoDBClient;