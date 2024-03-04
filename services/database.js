const {MongoClient} = require("mongodb");

const uri = "mongodb://mongodb:27017"

const client = new MongoClient(uri);

const db = client.db("devops-database");
module.exports = {
    db: db,
    client: client
};