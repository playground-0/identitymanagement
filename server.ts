import express, { Express, Request, Response, NextFunction } from "express";
import cors from "cors";
import { Client, GatewayIntentBits } from "discord.js";
import ENV from "./env";

const discordClient = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
  ],
});

// https://www.digitalocean.com/community/tutorials/how-to-build-a-discord-bot-with-node-js
const discordPrefix = "!";
discordClient.on("messageCreate", function (message) {
  if (message.author.bot) return;
  if (!message.content.startsWith(discordPrefix)) return;

  const commandBody = message.content.slice(discordPrefix.length);
  const args = commandBody.split(" ");
  const command = (args.shift() || "").toLowerCase();

  if (command === "ping") {
    const timeTaken = Date.now() - message.createdTimestamp;
    message.reply(`Pong! This message had a latency of ${timeTaken}ms.`);
  }
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

app.post("/api/verify", (req: Request, res: Response) => {
  const { sfuToken } = req.body;
  res.json(sfuToken);
});

app.listen(port, () => {
  console.log(`Attaching to port ${port}`);
});
