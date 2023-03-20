import express, { Express, Request, Response, NextFunction } from "express";
import cors from "cors";

const app: Express = express();
const port: number = (process.env.PORT && parseInt(process.env.PORT)) || 8080;

// https://www.npmjs.com/package/cors
const whitelist = [
  "https://mentormountain.ca",
  "https://www.mentormountain.ca",
  "https://www.sfu.ca",
];

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
