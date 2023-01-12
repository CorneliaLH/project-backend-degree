var express = require("express");
var router = express.Router();

//Get all media
router.get("/", function (req, res, next) {
  req.app.locals.db
    .collection("media")
    .find()
    .toArray()
    .then((results) => {
      let showArray = [];
      let sortedArray = results.sort(function compare(a, b) {
        var dateA = new Date(a.date_pub);
        var dateB = new Date(b.date_pub);
        return dateA - dateB;
      });

      for (let i = 0; i < sortedArray.length; i++) {
        if (showArray.length < 4) {
          showArray.push(sortedArray[i]);
        }
      }
      console.log(results);

      res.send(showArray);
    });
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
        return dateA - dateB;
      });

      res.send(sortedArray);
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
        return dateA - dateB;
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
        return dateA - dateB;
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
        return dateA - dateB;
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
        return dateA - dateB;
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
        return dateA - dateB;
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
        return dateA - dateB;
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

module.exports = router;
