const { ApolloServer } = require("apollo-server-express");
const { makeExecutableSchema } = require("graphql-tools");
const { AuthDirective } = require("../api/custom-directives");
const jwt = require("jsonwebtoken");

const typeDefs = require("../api/schema");
let resolvers = require("../api/resolvers");

module.exports = ({ app, pgResource }) => {
  resolvers = resolvers(app);

  const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
    schemaDirectives: {
      auth: AuthDirective
    }
  });
  // -------------------------------

  const apolloServer = new ApolloServer({
    context: ({ req }) => {
      const tokenName = app.get("JWT_COOKIE_NAME");
      const token = req ? req.cookies[tokenName] : undefined;
      let user = null;
      try {
        if (token) {
          console.log("token", token);
          user = jwt.verify(token, app.get("JWT_SECRET"));
          console.log("decoded toekn", user);
        }
        return { req, pgResource, token, user };
      } catch (e) {
        // throw error
        console.log("error in apollo config", e);
      }
    },
    schema
  });

  apolloServer.applyMiddleware({
    app,
    cors: app.get("CORS_CONFIG")
    // -------------------------------
  });
};
