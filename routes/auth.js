const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

//REGISTER USER
router.post("/register", async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      return res.status(400).json("Email id is already present");
    } else {
      if (req.body.username || req.body.email || req.body.password) {
        const hashedPass = await bcrypt.hash(req.body.password, salt);
        const newUser = new User({
          username: req.body.username,
          email: req.body.email,
          password: hashedPass,
          profilePic: req.body.profilePic,
        });
        const user = await newUser.save();
        return res.status(200).json(user);
      } else {
        return res.status(400).json({ massage: "fill all required fileds" });
      }
    }
  } catch (err) {
    return res.status(500).json(err);
  }
});

// LOGIN USER

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(400).json("user not found !");
    }
    const validated = await bcrypt.compare(req.body.password, user.password);
    if (!validated) {
      return res.status(400).json("wrong credentials !");
    }

    const { password, ...others } = user._doc;
    console.log(user);
    return res.status(200).json(others);
  } catch (err) {
    return res.status(500).json(err);
  }
});

module.exports = router;
