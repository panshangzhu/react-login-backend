const router = require("express").Router();
const User = require("../model/user");
const bcrypt = require("bcryptjs");
const { registerValidation } = require("./logValidation");

router.post("/", async (req, res) => {
  const { error } = registerValidation(req.body);
  console.log(req.body);
  if (error !== undefined) {
    return res.status(400).send("there is a error");
  } else {
    const emailExist = await User.findOne({ email: req.body.email });
    console.log(emailExist);
    if (emailExist) {
      return res.status(400).send("Email already registered!");
    } else {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    console.log(hashedPassword);
    try {
      const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
      });
      user
        .save()
        .then(result => res.send(result))
        .catch(err => console.log(err));
    } catch (err) {
      res.status(400).send(err);
    }
  }
  }
});

module.exports = router;
