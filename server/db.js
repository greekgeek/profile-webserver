const MongoDB = require('mongodb').MongoClient;
// Connect using MongoClient
function MongoDBClient(params) {
    this.isConnected = false;
    this.uri = params.uri;
    this.client = null;
    this.dbName = 'portfolio';
}
MongoDBClient.prototype.findQuery = async function (query, collection) {
  try {
    var client = await this.connect();
    const db = client.db(this.dbName);
    var result = await db.collection(collection).find(query).toArray();
  } catch(e) {
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