import "dotenv/config";

const ENV = {
    VERIFIED_CLAIMS_SECRET: process.env.VERIFIED_CLAIMS_SECRET || "secret",
    DISCORD_BOT_TOKEN: process.env.DISCORD_BOT_TOKEN || ""
};

export default ENV;
