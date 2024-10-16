/** Auth-related routes. */

const User = require("../models/user");
const express = require("express");
const router = express.Router();
const createTokenForUser = require("../helpers/createToken");
const jsonSchema = require("jsonschema");
const newUserSchema = require("../schemas/newUserSchema.json");
const loginSchema = require("../schemas/loginSchema.json");
const ExpressError = require("../helpers/expressError");
require("colors");

/** Register user; return token.
 *
 *  Accepts {username, first_name, last_name, email, phone, password}.
 *
 *  Returns {token: jwt-token-string}.
 *
 */

router.post("/register", async function (req, res, next) {
  try {
    const { username, password, first_name, last_name, email, phone } =
      req.body;
    //Solves BUG #1
    const validator = jsonSchema.validate(req.body, newUserSchema);
    if (!validator.valid) {
      const errs = validator.errors.map((e) => e.stack);
      throw new ExpressError(errs);
    }
    let user = await User.register({
      username,
      password,
      first_name,
      last_name,
      email,
      phone,
    });
    const token = createTokenForUser(username, user.admin);
    return res.status(201).json({ token });
  } catch (err) {
    console.log(`${err}`.red);
    return next(err);
  }
}); // end

/** Log in user; return token.
 *
 *  Accepts {username, password}.
 *
 *  Returns {token: jwt-token-string}.
 *
 *  If incorrect username/password given, should raise 401.
 *
 */

router.post("/login", async function (req, res, next) {
  try {
    const { username, password } = req.body;
    const validator = jsonSchema.validate(req.body, loginSchema);
    if (!validator.valid) {
      const errs = validator.errors.map((e) => e.stack);
      throw new ExpressError(errs);
    }
    //await keyword was missing
    let user = await User.authenticate(username, password);
    const token = createTokenForUser(username, user.admin);
    return res.json({ token });
  } catch (err) {
    console.log(`${err}`.red);
    return next(err);
  }
}); // end

module.exports = router;
