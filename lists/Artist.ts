import { list } from "@keystone-next/keystone/schema";
import { text, relationship } from "@keystone-next/fields";

export const Artist = list({
  ui: {
    listView: {
      initialColumns: ["lastname", "name", "telephone", "address"],
    },
  },
  fields: {
    name: text({ isRequired: true }),
    lastname: text({ isRequired: true }),
    address: text({ isRequired: false }),
    telephone: text({ isRequired: false }),
    artwork: relationship({ ref: "Item.artist", many: true }),
  },
});
