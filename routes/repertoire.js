var express = require("express");
var router = express.Router();

router.get("/opera", function (req, res, next) {
  req.app.locals.db
    .collection("repetoire_opera")
    .find()
    .toArray()
    .then((results) => {
      let today = new Date();
      let publishedArray = [];

      let displayArray = results.filter(function compare(publish) {
        return publish.display_repetoire === true;
      });

      for (let i = 0; i < displayArray.length; i++) {
        let dateFromDB = new Date(displayArray[i].date_publish);
        if (dateFromDB < today) {
          publishedArray.push(displayArray[i]);
        }
      }

      res.send(publishedArray);
    });
});

router.get("/concert", function (req, res, next) {
  let today = new Date();
  let publishedArray = [];

  req.app.locals.db
    .collection("repetoire_concert")
    .find()
    .toArray()
    .then((results) => {
      let displayArray = results.filter(function compare(publish) {
        return publish.display_repetoire === true;
      });

      for (let i = 0; i < displayArray.length; i++) {
        let dateFromDB = new Date(displayArray[i].date_publish);
        console.log("date", dateFromDB);
        console.log(today);
        if (dateFromDB < today) {
          publishedArray.push(displayArray[i]);
        }
      }

      res.send(publishedArray);
    });
});
module.exports = router;
