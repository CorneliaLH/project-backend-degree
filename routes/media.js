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

        res.send({
          status: "error",
          message: "Could not perform request",
          data: { showArray },
        });
      });
  } catch (error) {
    console.log(error);
    res.json({ status: "error", message: "Could not perform request" });
  }
});

router.get("/all", function (req, res, next) {
  req.app.locals.db
    .collection("media")
    .find()
    .toArray()
    .then((results) => {
      let sortedArray = results.sort(function compare(a, b) {
        var dateA = new Date(a.date_pub);
        var dateB = new Date(b.date_pub);
        return dateB - dateA;
      });

      res.json({
        status: "200",
        message: "Successful",
        data: sortedArray,
      });
    });
});

router.get("/video", function (req, res, next) {
  req.app.locals.db
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
});

router.get("/audio", function (req, res, next) {
  req.app.locals.db
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
});

router.get("/news", function (req, res, next) {
  req.app.locals.db
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
});

router.get("/video/all", function (req, res, next) {
  req.app.locals.db
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
});

router.get("/audio/all", function (req, res, next) {
  req.app.locals.db
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
});

router.get("/news/all", function (req, res, next) {
  req.app.locals.db
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
});

//Add new media
router.post("/add", function (req, res, next) {
  req.app.locals.db
    .collection("media")
    .insertOne(req.body)
    .then((result) => {
      console.log(result);
      res.send(result);
    });
});

//Delete post
router.post("/delete", function (req, res, next) {
  req.app.locals.db
    .collection("media")
    .deleteOne({ _id: ObjectId(req.body._id) })
    .then((result) => {
      console.log(result);
      res.send(result);
    });
});

//Change post
router.post("/change", function (req, res, next) {
  console.log(req.body);
  req.app.locals.db
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
});

module.exports = router;
