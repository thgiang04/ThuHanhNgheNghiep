const express = require("express");
const connectDb = require("./data/db.js");

const app = express();
const port = 3000;

// const User = require("./models/Users.js");

app.use(express.urlencoded());
app.use(express.json());

// app.get("/", function (req, res) {
//   User.find({})
//     .then((users) => res.json(users))
//     .catch((error) => console.log(error));
//   return res.json();
// });

app.get("/api/hellowolrd", (req, res) => {
  res.json({ sayHi: "hello from server, nice to meet you!" });
});

connectDb();

app.listen(port, () => console.log(`http://localhost:${port}`));
