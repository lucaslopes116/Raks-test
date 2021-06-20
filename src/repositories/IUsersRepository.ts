import { ICreateUserDTO } from "../dtos/ICreateUserDTO";
import { IDeleteUserDTO } from "../dtos/IDeleteUserDTO";
import { IUpdateUserDTO } from "../dtos/IUpdateUserDTO";
import { User } from "../model/User";

interface IUsersRepository {
  create({ name, address, description, dob }: ICreateUserDTO): Promise<void>;
  list(): Promise<User[]>;
  update({ name, address, description, dob }: IUpdateUserDTO): Promise<void>;
  delete({ name }: IDeleteUserDTO): Promise<void>;
  findByName(name: string): Promise<User>;
}

export { IUsersRepository };
