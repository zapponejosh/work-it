const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ExercisesSchema = new Schema({
  name: {
    type: String,
    unique: true
  },
  activity: [
    {
      type: Schema.Types.ObjectId,
      ref: "Activity"
    }
  ]
});

const Exercises = mongoose.model("Exercises", ExercisesSchema);

module.exports = Exercises;
