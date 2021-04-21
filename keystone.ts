import { config, createSchema } from "@keystone-next/keystone/schema";
import {
  statelessSessions,
  withItemData,
} from "@keystone-next/keystone/session";

import { createAuth } from "@keystone-next/auth";
import "dotenv/config";

import { User } from "./lists/User";
import { Item } from "./lists/Item";
import { Role } from "./lists/Role";
import { permissionsList } from "./lists/fields";


let sessionSecret = process.env.SESSION_SECRET;

if (!sessionSecret) {
  if (process.env.NODE_ENV === "production") {
    throw new Error(
      "The SESSION_SECRET environment variable must be set in production"
    );
  } else {
    sessionSecret = "-- DEV COOKIE SECRET; CHANGE ME --";
  }
}

let sessionMaxAge = 60 * 60 * 24 * 30; // 30 days

const { withAuth } = createAuth({
  listKey: "User",
  identityField: "email",
  secretField: "password",
  initFirstItem: {
    fields: ["name", "email", "password"],
    // TODO add in initial roles here
  },
});

export default  withAuth(
  config({
    server: {
      cors: {
        origin: [`${process.env.FRONTEND_URL}`],
        credentials: true,
      },
    },
    db: {
      adapter: "prisma_postgresql",
      url: process.env.DATABASE_URL || "",
    },
    ui: {
      // Show the UI only for people who pass this test
      isAccessAllowed: ({session}) => { 
        session && console.log(session)
        return !!session?.data
        // return (session?.listKey === "User" && session?.data?.isAdmin)  // * when only the admin can access the backend
    }},
    lists: createSchema({
      User,
      Item,
      Role,
    }),
    session: withItemData(
      statelessSessions({
        maxAge: sessionMaxAge,
        secret: sessionSecret,
      }),
      // graphql  query that I can get after logging in.
      { User: `id name email role { ${permissionsList.join(' ')} }` }
    ),
  })
);
