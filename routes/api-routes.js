let mongoose = require("mongoose");
let db = require("../models");
mongoose.set('toJSON', { virtuals: true });

module.exports = (app) => {
// get last workout /api/workouts
app.get('/api/workouts', (req, res) => {
  db.Workout.find({})
  // need to send the duration of all the exercises
    .then(result => {
      res.json(result);
    })
    .catch(err => {
      res.json(err);
    });
});



// add exercise (post) /api/workouts/:id
app.put('/api/workouts/:id', ({ body, params }, res) => {
  console.log(body);
  if (body.name) {
    db.Workout.findByIdAndUpdate(
      { _id: params.id }, 
      { $push: {
          exercises: body
        } },
        function(err, result) {
        if (err) {
          res.json(err)
        } else {
          res.json(result)
        };
      }
    )
  } else {
    res.end();
  }
});

// create workout (post) /api/workouts
app.post('/api/workouts', ({ body }, res) => {
  db.Workout.create({})
    .then(result => {
      res.json(result);
    })
    .catch(err => {
      res.json(err);
    });
});

// get workouts in range /api/workouts/range
app.get('/api/workouts/range', (req, res) => {
  // some conditions to make the dashboard slightly more usable
  // only return workouts that have exercises
  db.Workout.find({ "exercises.0": { "$exists": true } })
  // send most recent first
  .sort({ day: -1 })
  // limit 7 workouts so there will be at least 7 exercises to fill the chart 
  // if available but will not send every exercise in db
  .limit(7)
    .then(result => {
      res.json(result);
    })
    .catch(err => {
      res.json(err);
    });
});

/* 
in order to make the dashboard actually usuable it would be required to rewrite the frontend code and how the charts are filling in data. as of now it is designed in the provided frontend code to set each exercise as a day on the chart and breaks if you have more than one exercise in a workout and take no date logic into account. 
*/

}