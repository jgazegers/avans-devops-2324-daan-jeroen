const amqp = require('amqplib');
const console = require('console');

async function createRabbitMQChannel(retryCount = 5, retryDelay = 1000) {
    let retryAttempts = 0;

    async function connectWithRetry() {
        try {
            // Connect to RabbitMQ server
            const connection = await amqp.connect('amqp://rabbitmq');

            // Create a channel
            const channel = await connection.createChannel();

            // Return the channel
            return channel;
        } catch (error) {
            console.error('Error creating RabbitMQ channel:', error);
            if (retryAttempts < retryCount) {
                // Increment retry count
                retryAttempts++;
                // Exponential backoff
                const delay = retryDelay * Math.pow(2, retryAttempts);
                console.log(`Retrying in ${delay}ms...`);
                // eslint-disable-next-line no-undef
                await new Promise(resolve => setTimeout(resolve, delay));
                return connectWithRetry();
            } else {
                throw error; // Retry limit reached, propagate the error
            }
        }
    }

    return connectWithRetry();
}

module.exports = createRabbitMQChannel;