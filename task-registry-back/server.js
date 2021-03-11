var express = require("express"),
  app = express(),
  port = process.env.PORT || 3000,
  mongoUrl = process.env.MONGO_URL;
(cors = require("cors")),
  (mongoose = require("mongoose")),
  (Task = require("./api/tasks/taskModel")),
  (bodyParser = require("body-parser"));

mongoose.Promise = global.Promise;
mongoose.connect(mongoUrl);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

var routes = require("./api/tasks/taskRoutes");
routes(app);

app.listen(port);

console.log("todo list RESTful API server started on: " + port);

app.use(function (req, res) {
  res.status(404).send({ url: req.originalUrl + " not found" });
});
