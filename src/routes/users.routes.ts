import { Router } from "express";

import { CreateUserController } from "../useCases/createUser/CreateUserController";
import { DeleteUserController } from "../useCases/deleteUser/DeleteUserController";
import { ListUsersController } from "../useCases/listUser/ListUsersController";
import { UpdateUserController } from "../useCases/updateUser/UpdateUseController";

const usersRoutes = Router();

const createUserController = new CreateUserController();
const listUsersController = new ListUsersController();
const updateUsersController = new UpdateUserController();
const deleteUsersController = new DeleteUserController();

usersRoutes.post("/", createUserController.handle);

usersRoutes.get("/", listUsersController.handle);

usersRoutes.put("/", updateUsersController.handle);

usersRoutes.delete("/", deleteUsersController.handle);

export { usersRoutes };
