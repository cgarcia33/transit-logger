const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(cors());

// Bodyparser Middleware
app.use(bodyParser.json());

// DB Config
const db = require("./keys").mongoURI;

// Models
const LineStatus = require("./models/Status");
const Trip = require("./models/Trip");

// Connect to Mongo
mongoose
  .connect(db, { dbName: "transitDB", useNewUrlParser: true })
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// Routes

// @route   GET /api/status/:line
// @desc    Get status of line (ongoing trip or not?)
app.get("/api/status/:line", (req, res) => {
  LineStatus.findById(req.params.line, "ongoing toggleTime -_id").then(status =>
    res.send(status)
  );
});

// @route   PATCH /api/status/:line
// @desc    Patch status of line (ongoing trip or not?)
app.patch("/api/status/:line", (req, res) => {
  LineStatus.findByIdAndUpdate(req.params.line, req.body).then(status =>
    res.send(status)
  );
});

// @route   POST /api/trips
// @desc    Post a new trip along with the line and its station of origin
app.post("/api/trips/", (req, res) => {
  const newTrip = new Trip({
    line: req.body.line,
    origin: req.body.origin
  });

  newTrip.save().then(trip => res.send(trip));
});

// @route   PATCH /api/trips
// @desc    Update the trip with its destination and the time it ended (route called at end of trip)
app.patch("/api/trips/", (req, res) => {
  Trip.findOneAndUpdate(
    { line: req.body.line, end: null },
    {
      destination: req.body.destination,
      end: Date.now(),
      timeElapsed: calculateTimeElapsed(req.body.startTime)
    }
  ).then(trip => res.send(trip));
});

const calculateTimeElapsed = start => {
  let startDate = new Date(start);
  let endDate = new Date();
  return Math.round((endDate.getTime() - startDate.getTime()) / 60000);
};

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));
