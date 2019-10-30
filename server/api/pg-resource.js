function tagsQueryString(tags, itemid, result) {
  for (i = tags.length; i > 0; i--) {
    result += `($${i}, ${itemid}),`;
  }
  return result.slice(0, -1) + ";";
}

module.exports = postgres => {
  return {
    async createUser({ fullname, email, password }) {
      const newUserInsert = {
        text:
          "INSERT INTO users (fullname, email, password) VALUES ($1 $2 $3) RETURNING *",
        values: [fullname, email, password]
      };
      try {
        const user = await postgres.query(newUserInsert);
        return user.rows[0];
      } catch (e) {
        switch (true) {
          case /users_fullname_key/.test(e.message):
            throw "An account with this username already exists.";
          case /users_email_key/.test(e.message):
            throw "An account with this email already exists.";
          default:
            throw "There was a problem creating your account.";
        }
      }
    },
    async getUserAndPasswordForVerification(email) {
      const findUserQuery = {
        text: `SELECT * FROM users WHERE email = $1`,
        values: [email]
      };
      try {
        const user = await postgres.query(findUserQuery);
        if (!user) throw "User was not found.";
        return user.rows[0];
      } catch (e) {
        throw "User was not found.";
      }
    },
    async getUserById(id) {
      const findUserQuery = {
        text: `SELECT * from users WHERE id = $1`,
        values: [id]
      };
      try {
        const user = await postgres.query(findUserQuery);
        return user.rows[0];
      } catch (e) {
        throw "User is not found";
      }
    },
    async getItems(idToOmit) {
      const items = await postgres.query({
        text: `SELECT * from items ${idToOmit ? `WHERE"ownerId" != $1` : ``}`,
        values: idToOmit ? [idToOmit] : []
      });
      return items.rows;
    },
    async getItemsForUser(id) {
      const items = await postgres.query({
        text: `SELECT "ownerId", title FROM items WHERE "ownerId" = $1`,
        values: [id]
      });
      return items.rows;
    },
    async getBorrowedItemsForUser(id) {
      const items = await postgres.query({
        text: `SELECT * FROM items WHERE borrower = $1`,
        values: [id]
      });
      return items.rows;
    },
    async getTags() {
      const tags = await postgres.query(`SELECT * from tags`);
      return tags.rows;
    },
    async getTagsForItem(id) {
      const tagsQuery = {
        text: `SELECT tagId from itemTags INNER JOIN items ON itemTags.tagId = items.id`,
        values: [id]
      };

      const tags = await postgres.query(tagsQuery);
      return tags.rows;
    },
    async saveNewItem({ item, user }) {
      /**
       *  @TODO: Adding a New Item
       *
       *  Adding a new Item requires 2 separate INSERT statements.
       *
       *  All of the INSERT statements must:
       *  1) Proceed in a specific order.
       *  2) Succeed for the new Item to be considered added
       *  3) If any of the INSERT queries fail, any successful INSERT
       *     queries should be 'rolled back' to avoid 'orphan' data in the database.
       *
       *  To achieve #3 we'll ue something called a Postgres Transaction!
       *  The code for the transaction has been provided for you, along with
       *  helpful comments to help you get started.
       *
       *  Read the method and the comments carefully before you begin.
       */

      return new Promise((resolve, reject) => {
        /**
         * Begin transaction by opening a long-lived connection
         * to a client from the client pool.
         * - Read about transactions here: https://node-postgres.com/features/transactions
         */
        postgres.connect((err, client, done) => {
          try {
            client.query("BEGIN", async err => {
              const { title, description, tags } = item;
              const newItemQuery = {
                text: `INSERT INTO items(title, description, imageURL, itemowner) RETURNING *`,
                values: [title, description, imageURL, itemowner]
              };
              const newItem = await postgres.query(newItemQuery);
              const tagItemQuery = {
                text: `INSERT INTO itemtags (tagId, itemId) VALUES &{tagsQueryString(itemid)}`,
                values: [tagId, itemId]
              };
              const newItemTag = await postgres.query(tagItemQuery);

              client.query("COMMIT", err => {
                if (err) {
                  throw err;
                }
                done();
                resolve(newItem.rows[0]);
              });
            });
          } catch (e) {
            client.query("ROLLBACK", err => {
              if (err) {
                throw err;
              }
              done();
            });
            switch (true) {
              default:
                throw e;
            }
          }
        });
      });
    }
  };
};
