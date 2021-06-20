import { inject, injectable } from "tsyringe";
import { IDeleteUserDTO } from "../../dtos/IDeleteUserDTO";
import { AppError } from "../../errors/AppError";
import { UsersRepository } from "../../repositories/implementations/UsersRepository";

@injectable()
class DeleteUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: UsersRepository
  ) {}

  async execute({ name }: IDeleteUserDTO): Promise<void> {
    const user = await this.usersRepository.findByName(name);

    if (!user) throw new AppError("User not exists");

    await this.usersRepository.delete({ name });
  }
}

export { DeleteUserUseCase };
