var express = require("express");
var router = express.Router();
var ObjectId = require("mongodb").ObjectID;

//Get media
router.get("/", async function (req, res, next) {
  try {
    await req.app.locals.db
      .collection("media")
      .find()
      .toArray()
      .then((results) => {
        let showArray = [];
        let sortedArray = results.sort(function compare(a, b) {
          var dateA = new Date(a.date_pub);
          var dateB = new Date(b.date_pub);
          return dateB - dateA;
        });

        for (let i = 0; i < sortedArray.length; i++) {
          if (showArray.length < 4) {
            showArray.push(sortedArray[i]);
          }
        }
        console.log(results);
        // throw new Error("Hello Error!");
        res.send(showArray);
      });
  } catch (error) {
    console.log(error);
    res.json({ status: "error", message: "Could not perform the task" });
  }
});

router.get("/all", async function (req, res, next) {
  try {
    await req.app.locals.db
      .collection("media")
      .find()
      .toArray()
      .then((results) => {
        let sortedArray = results.sort(function compare(a, b) {
          var dateA = new Date(a.date_pub);
          var dateB = new Date(b.date_pub);
          return dateB - dateA;
        });

        res.send(sortedArray);
      });
  } catch (error) {
    console.log(error);
    res.json({ status: "error", message: "Could not perform the task" });
  }
});

router.get("/video", async function (req, res, next) {
  try {
    await req.app.locals.db
      .collection("media")
      .find({ type: "Video" })
      .toArray()
      .then((results) => {
        let showArray = [];
        let sortedArray = results.sort(function compare(a, b) {
          var dateA = new Date(a.date_pub);
          var dateB = new Date(b.date_pub);
          return dateB - dateA;
        });

        for (let i = 0; i < sortedArray.length; i++) {
          if (showArray.length < 4) {
            showArray.push(sortedArray[i]);
          }
        }

        res.send(showArray);
      });
  } catch (error) {
    console.log(error);
    res.json({ status: "error", message: "Could not perform the task" });
  }
});

router.get("/audio", async function (req, res, next) {
  try {
    await req.app.locals.db
      .collection("media")
      .find({ type: "Audio" })
      .toArray()
      .then((results) => {
        let showArray = [];
        let sortedArray = results.sort(function compare(a, b) {
          var dateA = new Date(a.date_pub);
          var dateB = new Date(b.date_pub);
          return dateB - dateA;
        });

        for (let i = 0; i < sortedArray.length; i++) {
          if (showArray.length < 4) {
            showArray.push(sortedArray[i]);
          }
        }

        res.send(showArray);
      });
  } catch (error) {
    console.log(error);
    res.json({ status: "error", message: "Could not perform the task" });
  }
});

router.get("/news", async function (req, res, next) {
  try {
    await req.app.locals.db
      .collection("media")
      .find({ type: "News" })
      .toArray()
      .then((results) => {
        let showArray = [];
        let sortedArray = results.sort(function compare(a, b) {
          var dateA = new Date(a.date_pub);
          var dateB = new Date(b.date_pub);
          return dateB - dateA;
        });

        for (let i = 0; i < sortedArray.length; i++) {
          if (showArray.length < 4) {
            showArray.push(sortedArray[i]);
          }
        }

        res.send(showArray);
      });
  } catch (error) {
    console.log(error);
    res.json({ status: "error", message: "Could not perform the task" });
  }
});

router.get("/video/all", async function (req, res, next) {
  try {
    await req.app.locals.db
      .collection("media")
      .find({ type: "Video" })
      .toArray()
      .then((results) => {
        let sortedArray = results.sort(function compare(a, b) {
          var dateA = new Date(a.date_pub);
          var dateB = new Date(b.date_pub);
          return dateB - dateA;
        });

        res.send(sortedArray);
      });
  } catch (error) {
    console.log(error);
    res.json({ status: "error", message: "Could not perform the task" });
  }
});

router.get("/audio/all", async function (req, res, next) {
  try {
    await req.app.locals.db
      .collection("media")
      .find({ type: "Audio" })
      .toArray()
      .then((results) => {
        let sortedArray = results.sort(function compare(a, b) {
          var dateA = new Date(a.date_pub);
          var dateB = new Date(b.date_pub);
          return dateB - dateA;
        });

        res.send(sortedArray);
      });
  } catch (error) {
    console.log(error);
    res.json({ status: "error", message: "Could not perform the task" });
  }
});

router.get("/news/all", async function (req, res, next) {
  try {
    await req.app.locals.db
      .collection("media")
      .find({ type: "News" })
      .toArray()
      .then((results) => {
        let sortedArray = results.sort(function compare(a, b) {
          var dateA = new Date(a.date_pub);
          var dateB = new Date(b.date_pub);
          return dateB - dateA;
        });

        res.send(sortedArray);
      });
  } catch (error) {
    console.log(error);
    res.json({ status: "error", message: "Could not perform the task" });
  }
});

//Add new media
router.post("/add", async function (req, res, next) {
  try {
    await req.app.locals.db
      .collection("media")
      .insertOne(req.body)
      .then((result) => {
        console.log(result);

        res.send(result);
      });
  } catch (error) {
    console.log(error);
    res.json({ status: "error", message: "Could not perform the task" });
  }
});

//Delete post
router.post("/delete", async function (req, res, next) {
  try {
    await req.app.locals.db
      .collection("media")
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
      .collection("media")
      .updateMany(
        {
          _id: ObjectId(req.body.media._id),
        },
        {
          $set: {
            title: req.body.media.title,
            description: req.body.media.description,
            media_url: req.body.media.media_url,
            type: req.body.media.type,
            date_pub: req.body.media.date_pub,
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
