import express, { Express, Request, Response, NextFunction } from "express";
import cors from "cors";
import { Client, GatewayIntentBits, TextChannel, Guild } from "discord.js";
import ENV from "./env";

const discordClient = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
  ],
});

discordClient.login(ENV.DISCORD_BOT_TOKEN);

const app: Express = express();
const port: number = (process.env.PORT && parseInt(process.env.PORT)) || 8080;

// const corsOptions = {
//   origin: function (origin: any, callback: any) {
//     if (whitelist.indexOf(origin) !== -1) {
//       callback(null, true);
//     } else {
//       callback(new Error("Not allowed by CORS"));
//     }
//   },
// };

const corsOptions = {
  origin: "*",
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", (req: Request, _: Response, next: NextFunction) => {
  console.log("\n> Request URL:", req.originalUrl, "| Method:", req.method);
  next();
});

app.get("/api/health", (_: Request, res: Response) => {
  res.json({
    health: "OK",
  });
});

async function fetchGuild(): Promise<Guild> {
  return discordClient.guilds.fetch(ENV.DISCORD_GUILD_ID);
}

app.post("/api/generate-invite", async (req: Request, res: Response) => {
  const guild = await fetchGuild();
  const channel = (await guild.channels.fetch(
    ENV.DISCORD_WELCOME_CHANNEL_ID
  )) as TextChannel;

  if (channel) {
    const invite = await channel.createInvite({
      maxUses: 1,
      maxAge: 120,
      temporary: true,
      unique: true,
    });

    console.log("Invite", invite.toJSON());
    res.json({ invite: invite.url });
  }
});

function verifySFUToken(token: any) {
  return true;
}

app.post("/api/verify", async (req: Request, res: Response) => {
  const { sfuToken, discordTag } = req.body;

  if (!verifySFUToken) {
    res.status(403).send();
    return;
  }

  // Token verified
  const guild = await fetchGuild();
  const members = await guild.members.fetch();
  const targetUser = members.find((member) => member.user.tag === discordTag);

  if (!targetUser) {
    res.status(400).json({ error: `\'${discordTag}\' is not in the server` });
    return;
  }

  const roles = await guild.roles.fetch();
  const memberRole = roles.find(
    (role) => role.name === ENV.DISCORD_MEMBER_ROLE_NAME
  );

  if (!memberRole) {
    res.status(500).send();
    return;
  }

  targetUser.roles.add(memberRole);
  res.json({ message: `${discordTag} given role ${memberRole.name}` });
});

app.listen(port, () => {
  console.log(`Attaching to port ${port}`);
});
