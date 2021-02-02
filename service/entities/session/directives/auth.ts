import { ForbiddenError, SchemaDirectiveVisitor } from 'apollo-server-lambda'
import { defaultFieldResolver } from 'graphql'

import { getUser } from '../../../components/session'

export class AuthDirective extends SchemaDirectiveVisitor {
  // No type definitions are provided
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  visitObject(type): void {
    this.ensureFieldsWrapped(type)
    type._requiredAuthRole = this.args.requires
  }

  // Visitor methods for nested types like fields and arguments
  // also receive a details object that provides information about
  // the parent and grandparent types.
  // No type definitions are provided
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  visitFieldDefinition(field, details): void {
    this.ensureFieldsWrapped(details.objectType)
    field._requiredAuthRole = this.args.requires
  }

  // No type definitions are provided
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  ensureFieldsWrapped(objectType) {
    // Mark the GraphQLObjectType object to avoid re-wrapping:
    if (objectType._authFieldsWrapped) return

    objectType._authFieldsWrapped = true

    const fields = objectType.getFields()

    for(const fieldName of Object.keys(fields)) {
      const field = fields[fieldName]
      const { resolve = defaultFieldResolver } = field

      field.resolve = async function resolveFn(...args) {
        // Get the required Roles from the field first, falling back
        // to the objectType if no Role is required by the field:
        const requiredRoles = field._requiredAuthRole || objectType._requiredAuthRole

        if (!requiredRoles)
          return resolve.apply(this, args)

        const user = await getUser(args[2])

        if (!user || !requiredRoles.includes(user.role))
          throw new ForbiddenError('Not Authorized')

        return resolve.apply(this, args)
      }
    }
  }
}
