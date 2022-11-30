import { ServerRoute } from "@hapi/hapi";
import { UserSchema } from "../models/users/users";
import * as Handlers from "../controllers/users/users.controller";

const basePath = "/userApi/users";

const userRoutes: ServerRoute[] = [
  {
    method: "POST",
    path: `${basePath}/`,
    handler: Handlers.createUsers,
    options: {
      validate: {
        payload: UserSchema,
      }
    }
  },
  {
    method: 'GET',
    path: `${basePath}/`,
    handler: Handlers.getUsers,
  },
  {
    method: 'GET',
    path: `${basePath}/{userId}`,
    handler: Handlers.getUserById,
  },
  {
    method: 'PATCH',
    path: `${basePath}/update`,
    handler: Handlers.updateUserById,
    options:{
      validate:{
        payload:UserSchema
      }
    }

  },
  {
    method: 'DELETE',
    path: `${basePath}/remove/{userId}`,
    handler: Handlers.deleteUserById,
  }
];

export default userRoutes;
