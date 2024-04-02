var express = require('express');
var router = express.Router();

const {db} = require('../services/database');

const client = require('prom-client');
const gauge = new client.Gauge({ name: 'number_users_requested', help: 'number of times the user list has been requested'})

router.get('/', async function(req, res ) {
  let users = await db.collection('users').find().toArray();
  gauge.inc(1)
  res.json(users);
});

router.post('/', function(req, res ) {
  db.collection('users').insertOne(req.body)
      .then((user) => res.status(201).json({ "id": user.insertedId}))
      .catch(err => res.status(500).json(err));
})

module.exports = router;
