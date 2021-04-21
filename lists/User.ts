import { list } from "@keystone-next/keystone/schema";
import { text, password, checkbox, relationship } from "@keystone-next/fields";
import { rules, permissions } from "../access";


export const User = list({
  access: {
    create: ()=> true,
    read: rules.canManageUsers,
    update: rules.canManageUsers, 
    // only people with the permission can delete themselves
    // You can't delete yourself
    delete: permissions.canManageUsers,
  },
  // * ui. should they have access to the ui ??
  ui: {
    // hide backend ui from regular users
    hideCreate: (args) => !permissions.canManageUsers(args),
    hideDelete: (args) => !permissions.canManageUsers(args),
  },
  fields: {
    name: text({ isRequired: true }),
    email: text({ isRequired: true, isUnique: true }),
    password: password(),
    isAdmin: checkbox({
      defaultValue: false,
    }),
    artwork: relationship({ref: 'Item.user', many: true}),
    role: relationship({
      ref: "Role.assignedTo",
      // TODO add access control
    }), // TODO add  cart and orders
  },
});
