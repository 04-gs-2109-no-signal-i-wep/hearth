// stores all the functions that prevents front-end access to database
const {
  models: { User },
} = require("../db");

const requireToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const user = await User.findByToken(token);
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

const isAdmin = (req, res, next) => {
  if (!req.user.is_admin) {
    return res.status(403).send("You shall not pass!");
  } else {
    next();
  }
};

module.exports = {
  requireToken,
  isAdmin
};
