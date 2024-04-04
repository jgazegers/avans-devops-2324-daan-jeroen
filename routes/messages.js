const express = require('express');
const createRabbitMQChannel = require('../services/rabbitmq');
const router = express.Router();

router.post('/', async (req, res) => {
    const channel = await createRabbitMQChannel();
    const message = req.body.message;
    console.log(message);
    if (!message) {
        res.status(401).send("Unauthorized");
    }

    channel.assertQueue('myQueue', {durable: true});
    channel.sendToQueue('myQueue', Buffer.from(message), {persistent: true});

    res.send("Message sent successfully")
})

module.exports = router;