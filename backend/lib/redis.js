import Redis from "ioredis";
import dotenv from "dotenv";

dotenv.config();

export const redis = new Redis(process.env.UPSTASH_REDIS_URL);

export const testRedisConnection = async () => {
  try {
    await redis.set("stick", "bar");
    console.log("Redis connected successfully");
  } catch (error) {
    console.error("Redis connection failed:", error.message);
  }
};
