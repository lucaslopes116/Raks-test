import { inject, injectable } from "tsyringe";
import { IUpdateUserDTO } from "../../dtos/IUpdateUserDTO";
import { AppError } from "../../errors/AppError";

import { IUsersRepository } from "../../repositories/IUsersRepository";

@injectable()
class UpdateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execute({
    name,
    address,
    dob,
    description,
  }: IUpdateUserDTO): Promise<void> {
    const user = await this.usersRepository.findByName(name);

    if (!user) throw new AppError("User not exists");

    const addressUpdated = !!address ? address : user.address;
    const dobUpdated = !!dob ? dob : user.dob;
    const descriptionUpdated = !!description ? description : user.description;

    const update = {
      name,
      address: addressUpdated,
      description: descriptionUpdated,
      dob: dobUpdated,
    };

    await this.usersRepository.update(update);
  }
}

export { UpdateUserUseCase };
