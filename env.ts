import "dotenv/config";

const DEFAULT = "";

const ENV = {
    VERIFIED_CLAIMS_SECRET: process.env.VERIFIED_CLAIMS_SECRET || "secret",
    DISCORD_BOT_TOKEN: process.env.DISCORD_BOT_TOKEN || DEFAULT,
    DISCORD_WELCOME_CHANNEL_ID: process.env.DISCORD_WELCOME_CHANNEL_ID || DEFAULT,
    DISCORD_GUILD_ID: process.env.DISCORD_GUILD_ID || DEFAULT,
    DISCORD_MEMBER_ROLE_NAME: process.env.DISCORD_MEMBER_ROLE_NAME || DEFAULT
};

for (const [k, v] of Object.entries(ENV)) {
  if (v === DEFAULT) {
    console.error(`${k} UNAVAILABLE`);
    process.exit(1)
  }
}
export default ENV;
