const router = require('express').Router();
const { MongoClient } = require('mongodb');

const uri = "mongodb+srv://pogdon:ixRMAC6mYiKvboSp@cluster0.2zveq.mongodb.net";
const mongoclient = new MongoClient(uri);

mongoclient.connect(async function(err, mongoclient) {
  const db = mongoclient.db("soundscale");
  const date = new Date;

  db.listCollections({ name: date.getFullYear().toString() }).next(async function(err, collinfo) {
    if (!collinfo) {
      await db.createCollection(date.getFullYear().toString());
      await db.collection(date.getFullYear().toString()).insertOne({
        name: "data",
        data: [{x: 45.3, y: 102.3, db: 10}]
      })
    }
  })
  router.get("/", (req, res) => {
    res.render("index")
  })

  router.get("/api/chartData", async (req, res) => {
    if (!req.query.year) {
      return res.status(400).send("You must include a year in the query!");
    }
    var years = {
      "2021": true
    }
    if (!years[req.query.year.toString()]) {
      return res.status(400).send("That wasn't a valid year!");
    }
    var collection = db.collection(req.query.year.toString());
    let data = await collection.findOne({name: "data"});
    return res.send(data)
  })

  router.post("/api/newData", async (req, res) => {
    console.log(req.headers)
    if (!req.body.location || !req.body.db) {
      return res.status(400).send("stap hacking! CORS is enabled for a reason.");
    }
    if (!req.body.location.x || !req.body.location.y){
      return res.status(400).send("stap hacking! CORS is enabled for a reason.");
    }
    if (Number(req.body.db) > 10 || Number(req.body.db) < 1){
      return res.status(400).send("stap hacking! CORS is enabled for a reason.");
    }
    if (Number(req.body.location.x).toString().toLowerCase() === "nan" || Number(req.body.location.y).toString().toLowerCase() === "nan"){
      return res.status(400).send("stap hacking! CORS is enabled for a reason.");
    }
    let currentDate = new Date;
    await db.collection(currentDate.getFullYear().toString()).updateOne({name: "data"}, {
      $push: {data: {
        x: req.body.location.x,
        y: req.body.location.y,
        db: req.body.db
      }}
    });
    return res.send("ok")
  })
});
module.exports = router;