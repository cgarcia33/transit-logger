const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();

// Bodyparser Middleware
app.use(bodyParser.json());

// DB Config
const db = require("./keys").mongoURI;

// Models
const LineStatus = require("./models/Status");

// Connect to Mongo
mongoose
  .connect(db, { dbName: "transitDB", useNewUrlParser: true })
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// Routes

// @route   GET /api/status/:line
// @desc    Get status of line (ongoing trip or not?)
app.get("/api/status/:line", (req, res) => {
  LineStatus.findById(req.params.line, "ongoing -_id").then(status =>
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

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));
