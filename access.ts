// at its simplest, access control returns a true or false (yes or no) depending on the user session
import { permissionsList } from "./lists/fields";
import { ListAccessArgs } from "./types";

export function isSignedIn({ session }: ListAccessArgs) {
  // * sessions is coming from context
  return !!session?.data;
}

export function isAdmin({ session }: ListAccessArgs) {
  console.log(session?.data?.isAdmin);
  return session?.data?.isAdmin;
}

const generatedPermissions = Object.fromEntries(
  permissionsList.map((permission) => [
    permission,
    function ({ session }: ListAccessArgs) {
      return !!session?.data.role?.[permission];
    },
  ])
);

// * Permissions check if someone meets a criteria - yes or no.

export const permissions = {
  ...generatedPermissions,
  //* if we want to add extra permissions we can check and do it in this way for example
  //* in this case, isAwesome permission will be given if the name of the user who is signed in includes the word: matias
  //* isAwesome({session}:ListAccessArgs):boolean {
  //*      return session?.data.name.includes('matias')
  //* }
};

// *************************************************************** //
// * Rules based functions
// * rules can return a boolean or a filter which limit which products they can access (CRUD)

export const rules = {
  // * 1. do they have the permission of canManageProducts
  canManageProducts({ session }: ListAccessArgs) {
    if (permissions.canManageProducts({ session })) {
      return true;
    }

    // * 2. if not, do they own the product ?
    console.log({ user: { id: session?.itemId } });
    return { user: { id: session?.itemId } };
  },

  canManageRoles({ session }: ListAccessArgs) {
    if (permissions.canManageRoles({ session })) {
      return true;
    }
    return false;
  },

  canReadProducts({ session }: ListAccessArgs) {
    if (permissions.canManageProducts({ session })) {
      return true;
    }
    return false;
  },

  canCreateProducts({ session }: ListAccessArgs) {
    if (permissions.canManageProducts({ session })) {
      return true;
    }
    return false;
  },

  canManageUsers({ session }: ListAccessArgs) {

    if (!isSignedIn({session})) {
      return false;
    }

    if (permissions.canManageUsers({ session })) {
      return true;
    }

    // otherwise they may only update themselves
    return  { id: session?.itemId } ;
  },
};
