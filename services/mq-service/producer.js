const express = require('express');
const amqp = require('amqplib');

const app = express();

app.use(express.json());

const port = 3002;

let channel;

// Connect to RabbitMQ and create a channel
amqp.connect('amqp://rabbitmq')
    .then((connection) => connection.createChannel())
    .then((ch) => {
        channel = ch;
        console.log('RabbitMQ channel assigned');
    })
    .catch((err) => {
        console.error('Failed to connect to RabbitMQ:', err);
        process.exit(1);
    });

// Define routes
app.get('/', (req, res) => {
    res.send('Hello, World!');
});

app.post('/send-message', (req, res) => {
    const message = req.body.message;
    channel.assertQueue('myQueue', { durable: false });
    channel.sendToQueue('myQueue', Buffer.from(message));
    res.send('Message sent successfully');
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
