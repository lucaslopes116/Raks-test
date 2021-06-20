import { Request, Response } from "express";
import { container } from "tsyringe";
import { DeleteUserUseCase } from "./DeleteUserUseCase";

class DeleteUserController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { name } = req.body;

    const deleteUseUseCase = container.resolve(DeleteUserUseCase);

    await deleteUseUseCase.execute({ name });

    return res.status(200).send();
  }
}

export { DeleteUserController };
