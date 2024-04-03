const amqp = require('amqplib');

async function consumeMessages() {
    try {
        // Connect to RabbitMQ server
        const connection = await amqp.connect('amqp://rabbitmq');
        const channel = await connection.createChannel();

        // Declare the queue
        const queue = 'myQueue';
        await channel.assertQueue(queue, { durable: false });

        // Consume messages from the queue
        channel.consume(queue, (message) => {
            const content = message.content.toString();
            console.log(`Received message: ${content}`);

            // Acknowledge the message
            channel.ack(message);
        });

        console.log('Waiting for messages...');
    } catch (error) {
        console.error('Error:', error);
    }
}

consumeMessages();