const {
  wrapUpResponseData,
  getRequestToken,
  checkUserLogin,
} = require("../utils/utils");

const addActivity = (req, res, next) => {
  //เอาแค่ activity ที่เป็นของตัว user
  try {
    const activity = Activity({
      id: id,
      user: activity.user,
      activity: activity.type,
      date: activity.date,
      time: activity.time,
      sets: parseInt(activity.sets),
      calories: parseInt(activity.calories),
    });
    activity.save();
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
    const activity = await Activity.findOne({ id: req.params.id });
    if (!activity) return next(new Error("activity not found"));
  
    activity.id = id;
    activity.user = user;
    activity.activity = activity;
    activity.date = date;
    activity.time = time;
    activity.sets = parseInt(sets);
    activity.calories = parseInt(calories);

    activity.save();

    res.status(200).json({ message: "updated activity successfully" });
  } catch (error) {
    next(error);
  }
};

const getActivities = async (req, res, next) => {
  // เช็คว่าเป็นของ user ไหน
// ดึงมาทั้งหมดจาก DB ของ user id ที่เลือก
  //find
  const { id, user, activity, date, time, sets, calories } = req.body;
  try {
    const activities = await Activity.find({ userId: user.id });
    if (!activities) return next(new Error("activity not found"));
      
    res.status(200).json(activities);
  } catch (error) {
    next(error);
  }
};

const getActivity = (req, res, next) => {
  // เช็คว่าเป็นของ user ไหน

  //findOne
  const activity = Activity({
    id: id,
    user: activity.user,
    activity: activity.type,
    date: activity.date,
    time: activity.time,
    sets: parseInt(activity.sets),
    calories: parseInt(activity.calories),
  });
  activity.save();
};

const removeActivity = (req, res, next) => {
  // เช็คว่าเป็นของ user ไหน

  // removeOne
  const activity = Activity.deleteOne(req.params.id);
};

module.exports = {
  addActivity,
  updateActivity,
  getActivity,
  getActivities,
  removeActivity,
};
