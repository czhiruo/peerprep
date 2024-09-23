import { Request, Response } from "express";

class QuestionController {
  async getAll(req: Request, res: Response) {
    res.status(200).json("All questions here.");
  }

  async getById(req: Request, res: Response) {
    res.status(200).json("Get by ID");
  }

  async getByFilter(req: Request, res: Response) {
    res.status(200).json("Get by filter");
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
