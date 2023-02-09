var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var scheduleRouter = require("./routes/schedule");
var mediaRouter = require("./routes/media");
var repertoireRouter = require("./routes/repertoire");
require("dotenv").config();
let cors = require("cors");

var app = express();
app.use(cors());

const MongoClient = require("mongodb").MongoClient;
MongoClient.connect(
  // "mongodb://127.0.0.1:27017"
  process.env.MONGO_ATLAS_LINK,
  {
    useUnifiedTopology: true,
  }
).then((client) => {
  console.log("Connected to the database!");

  const db = client.db("degreeProjectJoachim");
  app.locals.db = db;
});

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/schedule", scheduleRouter);
app.use("/media", mediaRouter);
app.use("/repertoire", repertoireRouter);

module.exports = app;
