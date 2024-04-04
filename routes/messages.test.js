const createRabbitMQChannel = require('../services/rabbitmq');

jest.mock('../services/rabbitmq', () => jest.fn());

describe('Messages Route', () => {
  it('should import createRabbitMQChannel function', () => {
    expect(createRabbitMQChannel).toBeDefined();
  });

  // Add more test cases here
});