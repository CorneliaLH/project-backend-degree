var express = require("express");
var router = express.Router();
var ObjectId = require("mongodb").ObjectID;

//get for home to render the first three future posts
router.get("/", async function (req, res, next) {
  try {
    await req.app.locals.db
      .collection("schedule")
      .find()
      .toArray()
      .then((results) => {
        let today = new Date();
        let futureArray = [];

        let sortedArray = results.sort(function compare(a, b) {
          var dateA = new Date(a.date_remove);
          var dateB = new Date(b.date_remove);
          return dateA - dateB;
        });

        for (let i = 0; i < sortedArray.length; i++) {
          let dateFromDB = new Date(sortedArray[i].date_remove);
          if (dateFromDB >= today) {
            if (futureArray.length < 3) {
              futureArray.push(sortedArray[i]);
            }
          }
        }

        res.send(futureArray);
      });
  } catch (error) {
    console.log(error);
    res.json({ status: "error", message: "Could not perform the task" });
  }
});

//get for schedule to render all future posts
router.get("/all", async function (req, res, next) {
  try {
    await req.app.locals.db
      .collection("schedule")
      .find()
      .toArray()
      .then((results) => {
        let today = new Date();
        let futureArray = [];

        let sortedArray = results.sort(function compare(a, b) {
          var dateA = new Date(a.date_remove);
          var dateB = new Date(b.date_remove);
          return dateA - dateB;
        });

        for (let i = 0; i < sortedArray.length; i++) {
          let dateFromDB = new Date(sortedArray[i].date_remove);
          if (dateFromDB >= today) {
            console.log(dateFromDB);

            futureArray.push(sortedArray[i]);
          }
        }

        res.send(futureArray);
      });
  } catch (error) {
    console.log(error);
    res.json({ status: "error", message: "Could not perform the task" });
  }
});

//get for admin to render both old and future posts
router.get("/total", async function (req, res, next) {
  try {
    await req.app.locals.db
      .collection("schedule")
      .find()
      .toArray()
      .then((results) => {
        let sortedArray = results.sort(function compare(a, b) {
          var dateA = new Date(a.date_remove);
          var dateB = new Date(b.date_remove);
          return dateA - dateB;
        });

        res.send(sortedArray);
      });
  } catch (error) {
    console.log(error);
    res.json({ status: "error", message: "Could not perform the task" });
  }
});

//Create new schedule post
router.post("/add", async function (req, res) {
  try {
    await req.app.locals.db
      .collection("schedule")
      .insertOne({
        title: req.body.title,
        when: req.body.when,
        where: req.body.where,
        conductor: req.body.conductor,
        image_url: req.body.image_url,
        read_more: req.body.read_more,
        date_remove: req.body.date_remove,
      })
      .then((result) => {
        //If scheduled post is an Opera, an opera-repetoire post is created
        if (req.body.repetoire === "Opera") {
          req.app.locals.db
            .collection("repetoire_opera")
            .insertOne({
              composer: req.body.composer,
              opera: req.body.opera,
              role: req.body.role,
              date_publish: req.body.date_remove,
              schedule_id: result.insertedId,
              display_repetoire: req.body.display_repetoire,
            })
            .then((result) => {
              console.log(result);
              res.send(result);
            });

          //If scheduled post is a Concert, an opera-repetoire post is created
        } else if (req.body.repetoire === "Concert") {
          req.app.locals.db
            .collection("repetoire_concert")
            .insertOne({
              composer: req.body.composer,
              work: req.body.work,
              date_publish: req.body.date_remove,
              schedule_id: result.insertedId,
              display_repetoire: req.body.display_repetoire,
            })
            .then((result) => {
              res.send(result);
            });
        }
        console.log(result);
      });
  } catch (error) {
    console.log(error);
    res.json({ status: "error", message: "Could not perform the task" });
  }
});

//Commented out code, this code when deleting a schedulepost it deletes matching repertoirepost automatically.
//Kept it incase of future need.

// router.post("/delete", function (req, res) {
//   req.app.locals.db
//     .collection("schedule")
//     .deleteOne({ _id: ObjectId(req.body._id) })
//     .then((result) => {
//       console.log(result);
//     });

//   req.app.locals.db
//     .collection("repetoire_opera")
//     .deleteOne({ schedule_id: ObjectId(req.body._id) })
//     .then((result) => {
//       console.log(result);
//     });
//   req.app.locals.db
//     .collection("repetoire_concert")
//     .deleteOne({ schedule_id: ObjectId(req.body._id) })
//     .then((result) => {
//       console.log(result);
//     });
// });

//Delete post
router.post("/delete", async function (req, res, next) {
  try {
    await req.app.locals.db
      .collection("schedule")
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

//Change post
router.post("/change", async function (req, res, next) {
  try {
    await req.app.locals.db
      .collection("schedule")
      .updateMany(
        {
          _id: ObjectId(req.body.schedule._id),
        },
        {
          $set: {
            title: req.body.schedule.title,
            when: req.body.schedule.when,
            where: req.body.schedule.where,
            media_url: req.body.schedule.media_url,
            date_remove: req.body.schedule.date_remove,
            conductor: req.body.schedule.conductor,
          },
        }
      )
      .then((result) => {
        console.log(result);
        res.send(result);
      });
  } catch (error) {
    console.log(error);
    res.json({ status: "error", message: "Could not perform the task" });
  }
});
module.exports = router;
