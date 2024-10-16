/** Middleware for handling req authorization for routes. */

const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../config");

/** Authorization Middleware: Requires user is logged in. */

function requireLogin(req, res, next) {
  try {
    // bug 6
    if (req.curr_admin) {
      return next();
    } else {
      if (req.params.username) {
        if (req.curr_username === req.params.username) {
          console.log(`${req.curr_username}`);
          console.log(`${req.curr_admin}`);
          console.log(`${req.params.username}`);
          return next();
        } else {
          return next({ status: 401, message: "Unauthorized" });
        }
      } else if (req.curr_username) {
        return next();
      } else {
        return next({ status: 401, message: "Unauthorized" });
      }
    }
  } catch (err) {
    return next(err);
  }
}

/** Authorization Middleware: Requires user is logged in and is staff. */

function requireAdmin(req, res, next) {
  try {
    if (req.curr_admin) {
      console.log(`${req.curr_username}`);
      console.log(`${req.curr_admin}`);
      console.log(`${req.params.username}`);
      return next();
    } else {
      return next({ status: 401, message: "Unauthorized" });
    }
  } catch (err) {
    return next(err);
  }
}

/** Authentication Middleware: put user on request
 *
 * If there is a token, verify it, get payload (username/admin),
 * and store the username/admin on the request, so other middleware/routes
 * can use it.
 *
 * It's fine if there's no token---if not, don't set anything on the
 * request.
 *
 * If the token is invalid, an error will be raised.
 *
 **/

function authUser(req, res, next) {
  try {
    const token = req.body._token || req.query._token;
    if (token) {
      let payload = jwt.decode(token);
      req.curr_username = payload.username;
      req.curr_admin = payload.admin;
    }
    return next();
  } catch (err) {
    err.status = 401;
    return next(err);
  }
} // end

module.exports = {
  requireLogin,
  requireAdmin,
  authUser,
};
