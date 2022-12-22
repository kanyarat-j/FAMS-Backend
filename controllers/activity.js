const {
  wrapUpResponseData,
  getRequestToken,
  checkUserLogin,
} = require("../utils/utils");

const addActivity = (req, res, next) => {
    const activity = new Activity({
        id: id,
        user: activity.user,
        activity: activity.type,
        date: activity.date,
        time: activity.time,
        sets: parseInt(activity.sets),
        calories: parseInt(activity.calories),
    })
    activity
    .save()
}
module.exports = {
    addActivity
  }
