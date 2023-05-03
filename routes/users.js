var express = require("express");
var router = express.Router();
const { body, validationResult } = require("express-validator");
const User = require("../models/User");

/* Validators */
//TODO: THis is where you need to implement your custom validators
const organizationValidator = async (value, { req }) => {
  const organization = req.body.organization;
  if (!value) {
    throw new Error("Organization cannot be empty.");
  }
};
const lastnameValidator = async (value) => {
  //const lastname = req.body.lastname;
  if (value) {
    throw new Error("Lastname cannot be empty.");
  }
};
const ageValidator = async (value) => {
  if (value < 18) {
    throw new Error("Age must be greater than 18.");
  }
};

router.get("/", async function (req, res, next) {
  const users = await User.findAll();
  if (req.query.msg) {
    res.locals.msg = req.query.msg;
  }
  res.render("users", { users });
});

router.post(
  "/create",
  //TODO: This is where you will be using your custom validators
  body("agenum").custom(ageValidator),
  body("lastname").custom(lastnameValidator),
  body("organization").custom(organizationValidator),
  async function (req, res, next) {
    try {
      const result = validationResult(req);
      const result2 = result.formatWith((error) => error.msg);
      const errors2 = result2.array();
      console.log(errors2);
      if (!result.isEmpty()) {
        throw new Error(errors2[0]);
      } else {
        await User.create({
          firstname: req.body.firstname,
          lastname: req.body.lastname,
          gender: req.body.gender,
          agenum: req.body.agenum,
          favorability: req.body.favorability,
          student: req.body.student,
          organization: req.body.organization,
          usecase: req.body.usecase,
        });
        res.redirect("/?msg=success");
      }
    } catch (error) {
      res.redirect("/?msg=" + new URLSearchParams(error.toString()).toString());
    }
  }
);

router.get("/:recordid", async function (req, res, next) {
  const user = await User.findUser(req.params.recordid);
  if (user) {
    res.render("userdetails", { user });
  } else {
    res.redirect("/?msg=user+not+found");
  }
});

module.exports = router;
