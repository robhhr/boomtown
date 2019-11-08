const { defaultFieldResolver } = require("graphql");
const { ForbiddenError } = require("apollo-server-express");
const { SchemaDirectiveVisitor } = require("graphql-tools");

class AuthDirective extends SchemaDirectiveVisitor {
  visitObject(type) {
    this.ensureFieldsWrapped(type);
  }
  visitFieldDefinition(field, details) {
    this.ensureFieldsWrapped(details.objectType);
  }

  ensureFieldsWrapped(objectType) {
    if (objectType._authFieldsWrapped) return;
    objectType._authFieldsWrapped = true;

    const fields = objectType.getFields();

    Object.keys(fields).forEach(fieldName => {
      const field = fields[fieldName];
      const { resolve = defaultFieldResolver } = field;
      field.resolve = async function(parent, args, context, info) {
        if (
          !context.token &&
          context.req.body.operationName !== "login" &&
          context.req.body.operationName !== "signup" &&
          false
        ) {
          throw new ForbiddenError("No permission to access");
        }

        return resolve.apply(this, [parent, args, context, info]);
      };
    });
  }
}

module.exports = {
  AuthDirective
};
