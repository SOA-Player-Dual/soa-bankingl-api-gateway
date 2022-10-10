import { createClient, RedisClientOptions, RedisClientType } from 'redis';
import 'dotenv/config';

const factory = (options: RedisClientOptions<any, any>): RedisClientType => {
  const client = createClient(options);
  return client as RedisClientType;
};

const RedisClient: RedisClientType = factory({ url: process.env.REDIS_URI });

export default RedisClient;
