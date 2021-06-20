import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListUsersUseCase } from "./ListUsersUseCase";

class ListUsersController {
  async handle(req: Request, res: Response): Promise<Response> {
    const listUsersUseCase = container.resolve(ListUsersUseCase);

    const allUsers = await listUsersUseCase.execute();

    return res.json(allUsers);
  }
}

export { ListUsersController };
