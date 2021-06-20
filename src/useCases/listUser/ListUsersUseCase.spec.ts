import { UserRepositoryInMemory } from "../../repositories/in-memory/UserRepositoryInMemory";
import { CreateUserUseCase } from "../createUser/CreateUserUseCase";

import { ListUsersUseCase } from "./ListUsersUseCase";

describe("List User", () => {
  let listUsersUseCase: ListUsersUseCase;
  let createUserUseCase: CreateUserUseCase;
  let usersRepositoryInMemory: UserRepositoryInMemory;

  beforeEach(() => {
    usersRepositoryInMemory = new UserRepositoryInMemory();
    listUsersUseCase = new ListUsersUseCase(usersRepositoryInMemory);
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
  });

  it("should be able to list all users", async () => {
    const user = {
      name: "User name test",
      description: "User description test",
      address: "User address test",
      dob: "User dob test",
    };
    await createUserUseCase.execute(user);

    const userCreated = await usersRepositoryInMemory.findByName(user.name);

    const listAllUsers = await listUsersUseCase.execute();

    expect(listAllUsers[0]).toEqual(userCreated);
  });
});
