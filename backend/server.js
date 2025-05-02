const express = require("express");
const connectDb = require("./data/db.js");
const route = require("./routes/userRoute.js");

const app = express();
const port = 3000;

app.use(express.urlencoded());
app.use(express.json());

connectDb();

app.use("/api", route);

app.listen(port, () => console.log(`http://localhost:${port}`));
