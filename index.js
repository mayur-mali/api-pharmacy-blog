const express = require("express");
const app = express();
const dotenv = require("dotenv");
const port = process.env.PORT || 5000;
const mongoose = require("mongoose");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const blogRouter = require("./routes/BlogRouters");
const cors = require("cors");
dotenv.config();

app.use(express.json());
app.use(cors({ origin: "*" }));

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(console.log("mongoose is running..."))
  .catch((err) => console.log(err));
app.get("/", (req, res) => res.send("app is running.."));
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/blog", blogRouter);

app.listen(`${port}`, () => {
  console.log("app is running...");
});
