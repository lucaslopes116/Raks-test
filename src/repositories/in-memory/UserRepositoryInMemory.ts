import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { IDeleteUserDTO } from "../../dtos/IDeleteUserDTO";
import { IUpdateUserDTO } from "../../dtos/IUpdateUserDTO";
import { User } from "../../model/User";
import { IUsersRepository } from "../IUsersRepository";

class UserRepositoryInMemory implements IUsersRepository {
  users: User[] = [];

  async create({
    name,
    address,
    description,
    dob,
  }: ICreateUserDTO): Promise<void> {
    const user = new User();

    Object.assign(user, { name, address, description, dob });

    this.users.push(user);
  }
  async list(): Promise<User[]> {
    const list = this.users;

    return list;
  }
  async update({
    name,
    address,
    description,
    dob,
  }: IUpdateUserDTO): Promise<void> {
    const userIndex = this.users.findIndex((user) => user.name === name);

    const updatedUser = { ...this.users[userIndex], address, description, dob };

    this.users.splice(userIndex, 1, updatedUser);
  }
  async delete({ name }: IDeleteUserDTO): Promise<void> {
    const userIndex = this.users.findIndex((user) => user.name === name);

    this.users.splice(userIndex);

    console.log(this.users);
  }
  async findByName(name: string): Promise<User> {
    const users = this.users.find((user) => user.name === name);

    return users;
  }
}
export { UserRepositoryInMemory };
