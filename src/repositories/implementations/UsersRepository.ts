import { getRepository, Repository } from "typeorm";

import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { IDeleteUserDTO } from "../../dtos/IDeleteUserDTO";
import { IUpdateUserDTO } from "../../dtos/IUpdateUserDTO";
import { User } from "../../model/User";
import { IUsersRepository } from "../IUsersRepository";

class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }
  async findByName(name: string): Promise<User> {
    const user = await this.repository.findOne({ name });

    return user;
  }

  async create({
    name,
    description,
    dob,
    address,
  }: ICreateUserDTO): Promise<void> {
    const user = this.repository.create({
      name,
      description,
      dob,
      address,
    });

    await this.repository.save(user);
  }

  async list(): Promise<User[]> {
    const users = await this.repository.find();
    return users;
  }

  async update({
    name,
    description,
    dob,
    address,
  }: IUpdateUserDTO): Promise<void> {
    await this.repository.update({ name }, { description, dob, address });
  }

  async delete({ name }: IDeleteUserDTO): Promise<void> {
    await this.repository.delete({ name });
  }
}

export { UsersRepository };
