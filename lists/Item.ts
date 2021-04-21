import { list } from "@keystone-next/keystone/schema";
import { text, integer, relationship, select } from "@keystone-next/fields";
import { isSignedIn, rules } from "../access";


export const Item = list({
  access: {
    create: isSignedIn,
    read: isSignedIn,
    update: rules.canManageProducts,
    delete: rules.canManageProducts,
  },

  ui: {
    listView: {
      initialColumns: ["name", "stock", "fieldName"],
    },
  },
  fields: {
    name: text({ isRequired: true, isUnique: true }),
    description: text({
      isRequired: true,
      ui: {
        displayMode: "textarea",
      },
    }),
    status: select({
      options: [
        {
          label: "Draft",
          value: "DRAFT",
        },
        {
          label: "Available",
          value: "AVAILABLE",
        },
        {
          label: "Unavailable",
          value: "UNAVAILABLE",
        },
      ],
      defaultValue: "DRAFT",
      ui: {
        displayMode: "segmented-control",
        createView: { fieldMode: "hidden" },
      },
    }),
    stock: integer({ isRequired: false }),
    fieldName: select({
      dataType: "string",
      options: [
        { label: "Earings", value: "Earings" },
        { label: "Neckless", value: "Neckless" },
        { label: "Vase", value: "Vase" },
        { label: "Painting", value: "Painting" },
      ],
      defaultValue: "Earings",
      isRequired: true,
      ui: { displayMode: "select" },
    }),
    price: integer(),
    user: relationship({
      ref: "User.artwork",
      many: false,
      defaultValue: ({context}) => ({
        connect: {id: context.session.itemId}
      })
    })
  },
});
