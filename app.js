const dotenv = require("dotenv");
const path = require("path");

if (process.env.NODE_ENV == "production") {
  dotenv.config({ path: "/.env.production" });
} else {
  dotenv.config({ path: "/.env.develop" });
}

const express = require("express");
const app = express();
const morgan = require("morgan");
const db = require("./models");
const cors = require("cors");
const host =
  process.env.NODE_ENV !== "production"
    ? "http://localhost:3000"
    : "서버ip주소";
// const host = "http://localhost:9000";
const logger = require("./logger/logger");
const requestIP = require("request-ip");

const session = require("express-session");
// const cookieParser = require("cookie-parser");
var FileStore = require("session-file-store")(session);
// 일단 닷엔브가 작동이 안되네
const fileStoreOption = {};
// console.log(["not exist???"], process.env.cookieSessionSecretKey);
const cookieKey = "blue_penuts";
// app.use(cookieParser(cookieKey, {}));
app.use(
  session({
    store: new FileStore(fileStoreOption),
    secret: cookieKey,
    resave: true,
    saveUninitialized: true,
    cookie: {
      secure: process.env.NODE_ENV === "production" || false, // if it's true, cookie will be sent over only https
      sameSite: true,
      httpOnly: true,
      maxAge: 10000 * 60 * 60,
    },
  })
);
// const host = "http://192.168.55.151:3000"

const { sequelize } = db;

app.all("*", (req, res, next) => {
  var clientIp = requestIP.getClientIp(req);
  logger.info(`${req.method} ${clientIp} ${req.url}`);
  next();
});
// CORS header setting
app.use(
  cors({
    credentials: true,
    origin: host,
  })
);

app.set("ROOT_PATH", path.join(__dirname, "/"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));

sequelize
  .sync({ force: false, alter: false })
  .then(() => {
    console.log("db is connected");
  })
  .catch((err) => {
    console.log("err: ", err);
    logger.error(err);
  });

app.get("/", (req, res) => {
  res.send("ok");
});

app.use("/v1", require("./routes/indexRouter"));

// logger
app.use((req, res, next) => {
  const error = new Error(`${req.method} ${req.url} no Router there`);
  error.status = 404;
  error.level = "error";
  logger.error(error.message);

  next();
});

// 에러메시지 클라로 전송
app.use((err, req, res) => {
  req.locals.message = err.message;
  req.locals.error = process.env.NODE_ENV !== "production" ? err : {};
  logger.error(err);
  res
    .status(err.status || 500)
    .json({ msg: err.message, statusCode: err.status });
});

app.listen(5000, () => {
  console.log("port is running on ", "5000 port");
});
