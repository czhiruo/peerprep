import { Request, Response } from "express";
import { querySchema } from "../validations/querySchema.js";

class QuestionController {
  async get(req: Request, res: Response) {
    const result = querySchema.safeParse(req.query);

    if (!result.success) {
      return res.status(400).json({ errors: result.error.format() });
    }

    const { id, c, d } = result.data;

    res.status(200).json(`Questions filtered by: id: ${id}, c: ${c}, d: ${d}`);
  }

  async create(req: Request, res: Response) {
    // ...
  }

  async update(req: Request, res: Response) {
    // ...
  }

  async delete(req: Request, res: Response) {
    // ...
  }
}

export const questionController = new QuestionController();
