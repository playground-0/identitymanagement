import "dotenv/config";

const ENV = {
    VERIFIED_CLAIMS_SECRET: process.env.VERIFIED_CLAIMS_SECRET || "secret",
    DISCORD_BOT_TOKEN: process.env.DISCORD_BOT_TOKEN || ""
};

if (ENV.DISCORD_BOT_TOKEN === "") {
    console.error("DISCORD_BOT_TOKEN UNAVAILABLE");
    process.exit(1);
  } else {
    console.info("DISCORD_BOT_TOKEN AVAILABLE");
  }

export default ENV;
