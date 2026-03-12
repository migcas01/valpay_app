import { createAccessControl } from "better-auth/plugins/access";
import {
  defaultStatements,
  adminAc,
  userAc,
} from "better-auth/plugins/admin/access";

const statement = {
  ...defaultStatements,
  invoice: ["create", "list", "view"],
  payment: ["list", "view"],
  transaction: ["list", "view"],
  commerce: ["create", "list", "view", "update", "delete"],
  apiKey: ["create", "list", "revoke"],
  admin: ["create", "list", "update", "delete"],
} as const;

export const ac = createAccessControl(statement);

export const user = ac.newRole({
  ...userAc.statements,
  invoice: ["view"],
  transaction: ["view"],
  payment: ["view"],
});

export const admin = ac.newRole({
  ...adminAc.statements,
  invoice: ["create", "list", "view"],
  payment: ["list", "view"],
  transaction: ["list", "view"],
  apiKey: ["create", "list", "revoke"],
});

export const maintainer = ac.newRole({
  ...adminAc.statements,
  invoice: ["create", "list", "view"],
  payment: ["list", "view"],
  transaction: ["list", "view"],
  commerce: ["create", "list", "view", "update", "delete"],
  apiKey: ["create", "list", "revoke"],
  admin: ["create", "list", "update", "delete"],
});
