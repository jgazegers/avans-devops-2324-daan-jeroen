var express = require('express');
var router = express.Router();

const {db} = require('../services/database');

router.get('/metrics', async function(req, res ) {
  let users = await db.collection('users').find().toArray();
  res.json("metrics test");
});

module.exports = router;
