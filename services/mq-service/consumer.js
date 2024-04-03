const createRabbitMQChannel = require('../rabbitmq');

async function consumeMessages() {
    try {
        const channel = await createRabbitMQChannel();

        channel.assertQueue('myQueue', {durable: true});
        channel.consume('myQueue', (message) => {
            console.log(`Received message: ${message.content.toString()}`);
        })

        console.log('Waiting for messages...');
    } catch (error) {
        console.error('Error:', error);
    }
}

consumeMessages();