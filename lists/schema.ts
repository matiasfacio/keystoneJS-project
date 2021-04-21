// import { createSchema, list } from '@keystone-next/keystone/schema';
// import {
//   text,
//   password,
//   integer,
//   select,
//   relationship,
// } from '@keystone-next/fields';


// export const lists = createSchema({
  // User: list({
  //   // * access ?
  //   // * ui. should they have access to the ui ??
  //   ui: {
  //     listView: {
  //       initialColumns: ['name'],
  //     },
  //   },
  //   fields: {
  //     name: text({ isRequired: true }),
  //     email: text({ isRequired: true, isUnique: true }),
  //     password: password(),
  //     // TODO add roles, cart and orders
  //   },
  // }),
  // Artist: list({
  //   ui: {
  //     listView: {
  //       initialColumns: ['lastname','name','telephone','address']
  //     },
  //   },
  //   fields: {
  //     name: text({isRequired: true}),
  //     lastname: text({isRequired: true}),
  //     address: text({isRequired: false}),
  //     telephone: text({isRequired: false}),
  //     artwork: relationship({ ref:'Item', many: true})
  //   },
  // }),
  // Item: list({
  //   ui: {
  //     listView: {
  //       initialColumns: ['name','stock', 'fieldName'],
  //     },
  //   },
  //   fields: {
  //     name: text({isRequired: true, isUnique: true}),
  //     description: text({isRequired: true}),
  //     stock: integer({isRequired: false}),
  //     artist: relationship({ref:'Artist', many: false}),
  //     fieldName: select({
  //       dataType: 'enum',
  //       options: [
  //         { label: 'Earings', value: 'Earings' },
  //         { label: 'Neckless', value: 'Neckless' },
  //         { label: 'Vase', value: 'Vase' },
  //         { label: 'Painting', value: 'Painting' },
  //       ],
  //       defaultValue: 'Earings',
  //       isRequired: true,
  //       ui: { displayMode: 'select' },
  //     })
  //   }
  // })
// });
