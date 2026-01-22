// const { createClient } = require("redis");

// const redis = createClient({
//   url: `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`
// });

// redis.on("connect", () => {
//   console.log("🔥 Redis connected");
// });

// redis.on("error", (err) => {
//   console.error("❌ Redis error:", err);
// });


// (async () => {
//   try {
//     await redis.connect();
//     console.log("✅ Redis siap dipakai");
//   } catch (err) {
//     console.error("❌ Redis gagal connect:", err);
//   }
// })();

// module.exports = redis; 
