const express = require('express')
const app = express()
const userRouter = require("./routes/user")
const mongoose = require('mongoose');
const { errorHandler } = require('./middlewares/errorHandlers')
const cors = require('cors')
require("dotenv").config()

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect(process.env.MONGODB_URI, {useNewUrlParser: true, useUnifiedTopology: true})
}
const corsOptions = {
  origin: process.env.FRONT_ORIGIN,
}
app.use(cors(corsOptions))
app.use(express.urlencoded({extended:false})) // read url
app.use(express.json()) // read json


// middleware error

app.use('/user', userRouter)

app.get('/',(req, res) => {
    res.send('home')
} )

app.use(errorHandler)
const PORT = parseInt(process.env.PORT)
app.listen(PORT, () => {
    console.log(`listen on port ${PORT}`)
})

//Update
app.put("/activity", async (req, res) => {
  const activity = req.body;
  const id = activity.id;
  const client = new MongoClient(uri);
  await client.connect();
  await client.db("M001").collection("FAMS_DB").updateOne({"id": id}, {"$set": {
      id: id,
      user: activity.user,
      activity: activity.type,
      date: activity.date,
      time: activity.time,
      sets: parseInt(activity.sets),
      calories: parseInt(activity.calories),
  }},{upsert: true})
  await client.close()
  res.status(200).send(activity);
});

app.get("/activity", async (req, res) => {
  res.status(200).send("Hello");
});