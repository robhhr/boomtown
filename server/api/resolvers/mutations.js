const { ApolloError } = require("apollo-server-express");
const { AuthenticationError } = require("apollo-server-express");
const bcrypt = require("bcryptjs");
const saltRounds = 10;

function setCookie({ tokenName, token, res }) {
  res.cookie(tokenName, token, {
    httpOnly: true,
    secret: process.env.NODE_ENV === "production",
    maxAge: 7200000
  });
}

function generateToken(user, secret) {
  const { id, email, fullname, bio } = user;
  return jwt.sign({ id, email, fullname, bio }, secret, { expiresIn: "2h" });
}

const jwt = require("jsonwebtoken");

const mutationResolvers = app => ({
  async signup(
    parent,
    {
      user: { fullname, email, password }
    },
    { pgResource, req }
  ) {
    try {
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      const user = await pgResource.createUser({
        fullname,
        email,
        password: hashedPassword
      });

      const token = generateToken(user, app.get("JWT_SECRET"));

      setCookie({
        tokenName: app.get("JWT_COOKIE_NAME"),
        token,
        res: req.res
      });

      return {
        token,
        user
      };
    } catch (e) {
      throw new AuthenticationError(e);
    }
  },

  async login(
    parent,
    {
      user: { email, password }
    },
    { pgResource, req }
  ) {
    try {
      const user = await pgResource.getUserAndPasswordForVerification(email);
      if (!user) throw "User was not found.";
      const valid = await bcrypt.compare(password, user.password);
      if (!valid) throw "Invalid Password";

      const token = generateToken(user, app.get("JWT_SECRET"));

      setCookie({
        tokenName: app.get("JWT_COOKIE_NAME"),
        token,
        res: req.res
      });

      return {
        token,
        user
      };
    } catch (e) {
      throw new AuthenticationError(e);
    }
  },

  logout(parent, args, context) {
    context.req.res.clearCookie(app.get("JWT_COOKIE_NAME"));
    return true;
  },
  async addItem(parent, args, context, info) {
    const user = await jwt.decode(context.token, app.get("JWT_SECRET"));
    const newItem = await context.pgResource.saveNewItem({
      item: args.item,
      user
    });
    return newItem;
  }
});

module.exports = mutationResolvers;
