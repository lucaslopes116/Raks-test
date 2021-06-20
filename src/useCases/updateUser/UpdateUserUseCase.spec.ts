import { AppError } from "../../errors/AppError";
import { UserRepositoryInMemory } from "../../repositories/in-memory/UserRepositoryInMemory";
import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { UpdateUserUseCase } from "./UpdateUserUseCase";

describe("Update User", () => {
  let updateUserUseCase: UpdateUserUseCase;
  let createUserUseCase: CreateUserUseCase;
  let usersRepositoryInMemory: UserRepositoryInMemory;

  beforeEach(() => {
    usersRepositoryInMemory = new UserRepositoryInMemory();
    updateUserUseCase = new UpdateUserUseCase(usersRepositoryInMemory);
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
  });

  it("should be able to update a user", async () => {
    const user = {
      name: "User name test",
      description: "User description test",
      address: "User address test",
      dob: "User dob test",
    };
    await createUserUseCase.execute(user);

    const userCreated = await usersRepositoryInMemory.findByName(user.name);

    const userUpdated = { ...userCreated, description: "UPDATED" };

    await updateUserUseCase.execute(userUpdated);

    expect(userCreated.address).toContain(userUpdated.address);
  });

  it("should be able to find a user not exists", async () => {
    expect(async () => {
      const user = {
        name: "User name test",
        description: "User description test",
        address: "User address test",
        dob: "User dob test",
      };
      await createUserUseCase.execute(user);

      const userCreated = await usersRepositoryInMemory.findByName(
        "User name test 2"
      );
    }).rejects.toBeInstanceOf(AppError);
  });
});
