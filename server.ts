import express, { Express, Request, Response, NextFunction } from "express";
import cors from "cors";

import ENV from "./env";

if (ENV.DISCORD_BOT_TOKEN === "") {
  console.error("DISCORD_BOT_TOKEN UNAVAILABLE");
} else {
  console.info("DISCORD_BOT_TOKEN AVAILABLE")
}

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
  origin: '*',
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
  const {sfuToken} = req.body;
  res.json(sfuToken)
})

app.listen(port, () => {
  console.log(`Attaching to port ${port}`);
});
