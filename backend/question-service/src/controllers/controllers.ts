import { Request, Response } from "express";
import { querySchema, createSchema, updateSchema} from "../validations/querySchema.js";
import { addQuestion, getQuestionById, getQuestionsByFilter } from "../services/questionService.js";
import { ObjectId } from "mongodb";

class QuestionController {
  async get(req: Request, res: Response) {
    const validation = querySchema.safeParse(req.query);

    if (!validation.success) {
      return res.status(400).json({ errors: validation.error.format() });
    }

    var { id, c, d } = validation.data;

    if (typeof c === 'string') {
      c = [c];
    }

    if (typeof d === 'string') {
      d = [d];
    }

    if (id) {
      const question = await getQuestionById(new ObjectId(id));
      return res.status(200).json(question);
    }

    res.status(200).json(await getQuestionsByFilter(c, d));
  }

  async create(req: Request, res: Response) {
    const validation = createSchema.safeParse(req.body);

    if (!validation.success) {
      return res.status(400).json({ errors: validation.error.format() });
    }

    var { title, desc, c, d } = validation.data;

    if (typeof c === 'string') {
      c = [c];
    }

    const id = await addQuestion({
      questionTitle: title,
      questionDescription: desc,
      questionCategory: c,
      questionComplexity: d,
    });

    res.status(201).json(
      `Question created with: 
        id: ${id},
        title: ${title}, 
        desc: ${desc}, 
        category: ${c}, 
        difficulty: ${d}`
    );
  }

  async update(req: Request, res: Response) {
    const validation = updateSchema.safeParse(req.body);

    if (!validation.success) {
      return res.status(400).json({ errors: validation.error.format() });
    }

    const { id, title, desc, c, d } = validation.data;

    res.status(200).json(
      `Question with id ${id} updated with: 
        title: ${title}, 
        desc: ${desc}, 
        category: ${c}, 
        difficulty: ${d}`
    );
  }

  async delete(req: Request, res: Response) {
    const validation = querySchema.safeParse(req.params); 

    if (!validation.success) {
      return res.status(400).json({ errors: validation.error.format() });
    }

    const { id } = validation.data;

    res.status(200).json(`Question with id ${id} has been deleted.`);
  }
}

export const questionController = new QuestionController();
