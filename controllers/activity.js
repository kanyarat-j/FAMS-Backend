const Activity = require('../models/activity')
const {
  getRequestToken,
  checkUserLogin
} = require("../utils/utils");

const addActivity = (req, res, next) => {
  //เอาแค่ activity ที่เป็นของตัว user
  const {
    id,
    user,
    activity: type,
    date,
    time,
    sets,
    calories,
  } = req.body.user;
 try {
    const activity = new Activity({
      id: req.body.id,
      userId: req.body.user.id,
      activity: req.body.activity,
      date: req.body.date,
      time: req.body.time,
      sets: req.body.parseInt(sets),
      calories: req.body.parseInt(calories),
    });
    res.status(200).json({ message: "added activity successfully" });
  } catch (error) {
    next(error);
  }
};

const updateActivity = async (req, res, next) => {
  // เช็คว่าเป็นของ user ไหน filter
  //findOne
  //updateOne
  const { id, user, activity, date, time, sets, calories } = req.body;
  try {
    const activities = await Activity.findOne({ id: req.params.id });
    if (!activities) return next(new Error("activity not found"));

    activities.id = id;
    activities.userId = user.id;
    activities.activity = activity;
    activities.date = date;
    activities.time = time;
    activities.sets = parseInt(sets);
    activities.calories = parseInt(calories);

    activities.save();

    res.status(200).json({ message: "updated activity successfully" });
  } catch (error) {
    next(error);
  }
};

const getActivities = async (req, res, next) => {
  // เช็คว่าเป็นของ user ไหน
  // ดึงมาทั้งหมดจาก DB ของ user id ที่เลือก
  //find
  const { user } = req.body;
  try {
    const activities = await Activity.find({ userId: user.id });
    if (!activities) return next(new Error("activity not found"));

    res.status(200).json(activities);
  } catch (error) {
    next(error);
  }
};

const getActivity = async (req, res, next) => {
 // เช็คว่าเป็นของ user ไหน
  const id = req.params.id;
  //findOne
  const activity = await Activity.findOne({ id });
  res.send(activity);
};

const removeActivity = async (req, res, next) => {
  // เช็คว่าเป็นของ user ไหน
  const id = req.params.id;
  // removeOne
  const activity = await Activity.deleteOne(req.params.id);
  res.send({ message: "Successfully Deleted" });
};

module.exports = {
  addActivity,
  updateActivity,
  getActivity,
  getActivities,
  removeActivity,
};

