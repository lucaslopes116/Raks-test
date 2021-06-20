import { Request, Response } from "express";
import { container } from "tsyringe";

import { UpdateUserUseCase } from "./UpdateUserUseCase";

class UpdateUserController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { name, description, dob, address } = req.body;

    const updateUserUseCase = container.resolve(UpdateUserUseCase);

    await updateUserUseCase.execute({ name, description, dob, address });

    return res.status(200).send();
  }
}

export { UpdateUserController };
