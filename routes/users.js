var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {

  req.app.locals.db.collection("useradmin").find().toArray().then(
    results => {
      console.log(results)
    }
  )
  res.send('USERS WORKING! FINEEEE!!');
});

router.post("/add", function(req,res) {
  req.app.locals.db.collection("useradmin").insertOne(req.body).then(result=>{
    console.log(result)
    res.redirect("/show")
  })
})

router.post("/login", async function (req, res) {
  //hämtar användare, om den inte finns error
  let user = await req.app.locals.db
    .collection("useradmin")
    .findOne({ userName: req.body.userName})
    .then((results) => {
      return results;
    });
  if (user === null) {
    res.json({ status: "error", message: "Användare finns inte" });
    return;} else {
      res.json({ status: "ok"})
    }
  })

module.exports = router;
