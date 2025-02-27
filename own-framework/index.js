const miniExpress = require("./minimanode");
const app = miniExpress();
const Router = miniExpress.Router;

const apiRouter = Router();

app.use((req, res, next) => {
  console.log("Middleware: Logging request");
  next();
});

apiRouter.get("/users", (req, res) => {
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ message: "List of users" }));
});

apiRouter.post("/users", (req, res) => {
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ message: "User created", data: req.body }));
});

app.useRouter("/api", apiRouter);

app.get("/", (req, res) => {
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ message: "Welcome to the homepage!" }));
});

app.listen(3000, () => {
  console.log("MiniExpress server is running on http://localhost:3000");
});
