var express = require('express');
var router = express.Router();

//Get all media
router.get('/', function(req, res, next) {
    req.app.locals.db.collection("media").find().toArray().then(
        results => {
          console.log(results)
          res.send(results)
        }
    )
   ;
})

//Add new media
router.post("/add", function(req, res, next) {
    req.app.locals.db.collection("media").insertOne(req.body).then(result=>{
      console.log(result) 
      res.send(result)  
    })
  })

module.exports = router;