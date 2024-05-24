const userService = require("./service");

const jwt = require("jsonwebtoken");

module.exports = {
  register: async (req, res) => {
    try {
      //   if (userService.isUsernameExists() && userService.isEmailExists()) {
      if (
        (await userService.findByEmail(req.body.email)) &&
        (await userService.findByUsername(req.body.username))
      ) {
        res.code(400);
        return {
          message: "username and email exist",
        };
      }

      const user = await userService.create(req.body);
      res.code(201);

      return {
        message: "user registration is successful",
        data: { user },
      };
    } catch (err) {
      res.code(500);
      return {
        err,
      };
    }
  },

  login: async (req, res) => {
    try {
      const user = await userService.findByUsername(req.body.username);

      if (!user) {
        res.code(400);
        return {
          message: "username is incorrect",
        };
      }

      if (
        !(await userService.comparePassword(user.password, req.body.password))
      ) {
        res.code(400);
        return {
          message: "incorrect password",
        };
      }

      const token = jwt.sign({ id: user._id }, "s6e5c4r3e2t1");

      res.code(200);
      return {
        message: "user logged in successfully",
        data: {
          user,
          token,
        },
      };
    } catch (err) {
      res.code(500);
      return {
        err,
      };
    }
  },
};
