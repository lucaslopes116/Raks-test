import { inject, injectable } from "tsyringe";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
  name: string;
  dob: string;
  description: string;
  address: string;
}

@injectable()
class CreateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}
  async execute({ name, description, dob, address }: IRequest): Promise<void> {
    this.usersRepository.create({ name, description, dob, address });
  }
}

export { CreateUserUseCase };
