const {MongoClient} = require("mongodb");

const uri = "mongodb://name:word@mongo:27017"

const client = new MongoClient(uri);

const db = client.db("devops-database");
module.exports = {
    db: db,
    client: client
};