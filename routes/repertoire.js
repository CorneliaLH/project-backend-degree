var express = require("express");
var router = express.Router();
var ObjectId = require("mongodb").ObjectID;

router.get("/opera", function (req, res, next) {
  req.app.locals.db
    .collection("repetoire_opera")
    .find()
    .toArray()
    .then((results) => {
      let today = new Date();
      let publishedArray = [];

      let displayArray = results.filter(function compare(publish) {
        return publish.display_repetoire === "true";
      });
      console.log(displayArray);

      for (let i = 0; i < displayArray.length; i++) {
        let dateFromDB = new Date(displayArray[i].date_publish);
        if (dateFromDB < today) {
          publishedArray.push(displayArray[i]);
        }
      }

      res.send(publishedArray);
    });
});

router.get("/opera/all", function (req, res, next) {
  req.app.locals.db
    .collection("repetoire_opera")
    .find()
    .toArray()
    .then((results) => {
      let publishedArray = results.sort(function compare(a, b) {
        var dateA = new Date(a.date_remove);
        var dateB = new Date(b.date_remove);
        return dateA - dateB;
      });

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
        return publish.display_repetoire === "true";
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

router.get("/concert/all", function (req, res, next) {
  req.app.locals.db
    .collection("repetoire_concert")
    .find()
    .toArray()
    .then((results) => {
      let publishedArray = results.sort(function compare(a, b) {
        var dateA = new Date(a.date_remove);
        var dateB = new Date(b.date_remove);
        return dateA - dateB;
      });

      res.send(publishedArray);
    });
});

//Delete opera post
router.post("/opera/delete", function (req, res, next) {
  req.app.locals.db
    .collection("repetoire_opera")
    .deleteOne({ _id: ObjectId(req.body._id) })
    .then((result) => {
      console.log(result);
      res.send(result);
    });
});

//Delete concert post
router.post("/concert/delete", function (req, res, next) {
  req.app.locals.db
    .collection("repetoire_concert")
    .deleteOne({ _id: ObjectId(req.body._id) })
    .then((result) => {
      console.log(result);
      res.send(result);
    });
});

//Change opera post
router.post("/opera/change", function (req, res, next) {
  console.log(req.body);
  req.app.locals.db
    .collection("repetoire_opera")
    .updateMany(
      {
        _id: ObjectId(req.body.operapost._id),
      },
      {
        $set: {
          work: req.body.operapost.work,
          composer: req.body.operapost.composer,
          display_repetoire: req.body.operapost.display_repetoire,
          date_publish: req.body.operapost.date_publish,
        },
      }
    )
    .then((result) => {
      res.send(result);
    });
});

//Change concert post
router.post("/concert/change", function (req, res, next) {
  console.log(req.body);
  req.app.locals.db
    .collection("repetoire_concert")
    .updateMany(
      {
        _id: ObjectId(req.body.concertpost._id),
      },
      {
        $set: {
          work: req.body.concertpost.work,
          composer: req.body.concertpost.composer,
          display_repetoire: req.body.concertpost.display_repetoire,
          date_publish: req.body.concertpost.date_publish,
        },
      }
    )
    .then((result) => {
      res.send(result);
    });
});

module.exports = router;
