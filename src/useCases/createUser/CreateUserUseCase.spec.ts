import { UserRepositoryInMemory } from "../../repositories/in-memory/UserRepositoryInMemory";
import { CreateUserUseCase } from "./CreateUserUseCase";

describe("Create User", () => {
  let createUserUseCase: CreateUserUseCase;
  let usersRepositoryInMemory: UserRepositoryInMemory;

  beforeEach(() => {
    usersRepositoryInMemory = new UserRepositoryInMemory();
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
  });
  it("should be able to create a new user", async () => {
    const user = {
      name: "User name test",
      description: "User description test",
      address: "User address test",
      dob: "User dob test",
    };
    await createUserUseCase.execute(user);

    const userCreated = await usersRepositoryInMemory.findByName(user.name);

    expect(userCreated).toHaveProperty("id");
  });
});
