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

module.exports = router;
