const { MongoClient } = require("mongodb");

const MONGO_USERNAME = process.env.MONGO_USERNAME;
const MONGO_PASSWORD = process.env.MONGO_PASSWORD;
const MONGO_ADDRESS = process.env.MONGO_ADDRESS;
const MONGO_DEFAULT_DATABASE = process.env.MONGO_DEFAULT_DATABASE;

// Check if running in test environment and if MONGO_URL is provided
let uri;

if (process.env.NODE_ENV === 'test' && process.env.MONGO_URL) {
    uri = process.env.MONGO_URL;
  } else {
    uri = `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_ADDRESS}`;
  }

const client = new MongoClient(uri);

const db = client.db(MONGO_DEFAULT_DATABASE);
module.exports = {
  db: db,
  client: client,
};
