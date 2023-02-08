var express = require("express");
var router = express.Router();
var ObjectId = require("mongodb").ObjectID;

router.get("/opera", async function (req, res, next) {
  try {
    await req.app.locals.db
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
  } catch (error) {
    console.log(error);
    res.json({ status: "error", message: "Could not perform the task" });
  }
});

router.get("/opera/all", async function (req, res, next) {
  try {
    await req.app.locals.db
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
  } catch (error) {
    console.log(error);
    res.json({ status: "error", message: "Could not perform the task" });
  }
});

router.get("/concert", async function (req, res, next) {
  let today = new Date();
  let publishedArray = [];

  try {
    await req.app.locals.db
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
  } catch (error) {
    console.log(error);
    res.json({ status: "error", message: "Could not perform the task" });
  }
});

router.get("/concert/all", async function (req, res, next) {
  try {
    await req.app.locals.db
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
  } catch (error) {
    console.log(error);
    res.json({ status: "error", message: "Could not perform the task" });
  }
});

//Delete opera post
router.post("/opera/delete", async function (req, res, next) {
  try {
    await req.app.locals.db
      .collection("repetoire_opera")
      .deleteOne({ _id: ObjectId(req.body._id) })
      .then((result) => {
        console.log(result);

        res.send(result);
      });
  } catch (error) {
    console.log(error);
    res.json({ status: "error", message: "Could not perform the task" });
  }
});

//Delete concert post
router.post("/concert/delete", async function (req, res, next) {
  try {
    await req.app.locals.db
      .collection("repetoire_concert")
      .deleteOne({ _id: ObjectId(req.body._id) })
      .then((result) => {
        console.log(result);

        res.send(result);
      });
  } catch (error) {
    console.log(error);
    res.json({ status: "error", message: "Could not perform the task" });
  }
});

//Change opera post
router.post("/opera/change", async function (req, res, next) {
  try {
    await req.app.locals.db
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
  } catch (error) {
    console.log(error);
    res.json({ status: "error", message: "Could not perform the task" });
  }
});

//Change concert post
router.post("/concert/change", async function (req, res, next) {
  try {
    await req.app.locals.db
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
  } catch (error) {
    console.log(error);
    res.json({ status: "error", message: "Could not perform the task" });
  }
});

module.exports = router;
