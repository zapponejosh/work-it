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
  console.log(params)
  // TODO make sure there are values before putting in db
  if (body.name) {
    db.Workout.findByIdAndUpdate(
      { _id: params.id }, 
      { $push: {
          exercises: body
        } },
        function(err, result) {
        if (err) {
          console.log(err)
          res.json(err)
        } else {
          console.log(result)
          res.json(result)
        };
      }
    )
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
  db.Workout.find({})
    .then(result => {
      res.json(result);
    })
    .catch(err => {
      res.json(err);
    });
});

}