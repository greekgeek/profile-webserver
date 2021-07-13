const MongoDB = require('mongodb').MongoClient;
// Connect using MongoClient
function MongoDBClient(params) {
    this.isConnected = false;
    this.uri = params.uri;
    this.client = null;
    this.dbName = 'portfolio';
}
MongoDBClient.prototype.findQuery = async function (query, collection) {
  const db = await this.connect();
  const result = await db.collection(collection).find(query).toArray();
  return result;
}
MongoDBClient.prototype.connect = async function() {
  const client = await MongoDB.connect(this.uri, { useUnifiedTopology: true });
  return client.db(this.dbName);
}
module.exports = MongoDBClient;