var express = require("express");
var router = express.Router();
// const { nanoid } = require("nanoid");
require("dotenv").config();

const CryptoJS = require("crypto-js");
// const { resetWatchers } = require("nodemon/lib/monitor/watch");

/* GET för att hämta alla users vid kontroll inlogg. */
router.get("/", async function (req, res, next) {
  res.send("respond with a resource");
});

//POST för login
router.post("/login", async function (req, res) {
  //hämtar användare, om den inte finns error
  let user = await req.app.locals.db
    .collection("useradmin")
    .findOne({ userName: req.body.userName })
    .then((results) => {
      return results;
    });
  if (user === null) {
    res.json({ status: "error", message: "Användare finns inte" });
    return;
  }
  //hämtar ut användare för att matcha dem med lösenord.
  let users = await req.app.locals.db
    .collection("useradmin")
    .find()
    .toArray()
    .then((results) => {
      return results;
    });

  console.log(user);
  for (let i = 0; i < users.length; i++) {
    let decryptPass = CryptoJS.AES.decrypt(
      users[i].password,
      // process.env.SALT
      "saltet"
    ).toString(CryptoJS.enc.Utf8);

    if (
      user.userName === users[i].userName &&
      req.body.password === decryptPass
    ) {
      console.log("Användare finns!!");
      return res.json({ status: "ok", message: users[i].userId });
    }
  }
  return res.json({ status: "error", message: "Användare finns inte" });
});

//POST för att skapa ny användare databas och prenumerant databas
//Randomiserade nycklar för nya anv
//Krypterat lösenord
router.post("/newuser", async function (req, res) {
  let users = await req.app.locals.db
    .collection("useradmin")
    .find()
    .toArray()
    .then((results) => {
      return results;
    });
  if (!req.body.userName || !req.body.password) {
    return res.json({
      status: "error-användarnamn krävs",
      message: "Användarnamn och password krävs!",
    });
  } else if (
    users.find((users) => (users.userName === req.body.userName) === true)
  ) {
    console.log("Namn finns redan");

    return res.json({
      status: "error-namn finns redan",
      message: "Namn finns redan",
    });
  }
  let userPassword = req.body.password;

  let encryptPass = CryptoJS.AES.encrypt(
    userPassword,
    // process.env.SALT
    "saltet"
  ).toString();

  let userId = "VR3CluW_L7WZJac17sdfBn6";

  let user = {
    userId: userId,
    userName: req.body.userName,
    password: encryptPass,
  };

  req.app.locals.db
    .collection("useradmin")
    .insertOne(user)
    .then((result) => {
      console.log(result);
    });

  res.json({ status: "ok" });
});

// router.get('/', function(req, res, next) {

//   req.app.locals.db.collection("useradmin").find().toArray().then(
//     results => {
//       console.log(results)
//     }
//   )
//   res.send('USERS WORKING! FINEEEE!!');
// });

// router.post("/add", function (req, res) {
//   req.app.locals.db
//     .collection("useradmin")
//     .insertOne(req.body)
//     .then((result) => {
//       console.log(result);
//       res.redirect("/show");
//     });
// });

// router.post("/login", async function (req, res) {
//   //hämtar användare, om den inte finns error
//   let user = await req.app.locals.db
//     .collection("useradmin")
//     .findOne({ userName: req.body.userName})
//     .then((results) => {
//       return results;
//     });
//   if (user === null) {
//     res.json({ status: "error", message: "Användare finns inte" });
//     return;} else {
//       res.json({ status: "ok"})
//     }
//   })

module.exports = router;
