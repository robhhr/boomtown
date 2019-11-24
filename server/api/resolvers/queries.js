const { ApolloError } = require("apollo-server");

const queryResolvers = app => ({
  viewer(parent, args, { user }, info) {
    console.log("getting viewer");
    console.log(user);
    return user;
  },
  async user(parent, { id }, { pgResource }, info) {
    try {
      const user = await pgResource.getUserById(id);
      return user;
    } catch (e) {
      throw new ApolloError(e);
    }
  },
  async items(parent, args, { pgResource, user }, info) {
    try {
      const items = await pgResource.getItems(args.filter);
      return items;
    } catch (e) {
      throw new ApolloError(e);
    }
  },
  async tags(parent, args, { pgResource }, info) {
    try {
      const tags = await pgResource.getTags("");
      return tags;
    } catch (e) {
      throw new ApolloError();
    }
  }
});

module.exports = queryResolvers;
