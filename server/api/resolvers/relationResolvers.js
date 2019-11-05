const { ApolloError } = require("apollo-server");

const relationResolvers = {
  User: {
    async items({ id }, args, { pgResource }) {
      try {
        const ownersItem = await pgResource.getItemsForUser(id);
        return ownersItem;
      } catch (e) {
        throw new ApolloError(e);
      }
    },

    async borrowed(parent, { id }, args, { pgResource }) {
      try {
        const itemsBorrowed = await pgResource.getBorrowedItemsForUser(id);
        return itemsBorrowed;
      } catch (e) {
        throw new ApolloError(e);
      }
    }
  },

  Item: {
    async itemowner({ ownerId }, args, { pgResource }, parent) {
      try {
        const itemsOwner = await pgResource.getUserById(ownerId);
        console.log(itemsOwner);
        return itemsOwner;
      } catch (e) {
        throw new ApolloError();
      }
    },
    async tags({ id }, args, { pgResource }, parent) {
      try {
        const getTags = await pgResource.getTagsForItem(id);
        return getTags;
      } catch (e) {
        throw new ApolloError();
      }
    },
    async borrower({ borrower }, args, { pgResource }, parent) {
      try {
        const itemBorrower = await pgResource.getUserById(borrower);
        return itemBorrower;
      } catch (e) {
        throw null;
      }
    }
  }
};

module.exports = relationResolvers;
