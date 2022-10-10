import RedisClient from '../src/config/redis';

beforeAll(async () => {
  await RedisClient.connect();
});

afterAll(async () => {
  await RedisClient.disconnect();
});
