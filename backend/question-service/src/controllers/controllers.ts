import { Request, Response } from "express";
import { Question } from "../models/question.js";
import { querySchema, createSchema, updateSchema, deleteSchema} from "../validations/querySchema.js";
import { addQuestion, getQuestionById, getQuestionsByFilter, updateQuestion, deleteQuestion } from "../services/questionService.js";
import { ObjectId } from "mongodb";

class QuestionController {
  async get(req: Request, res: Response) {
    const validation = querySchema.safeParse(req.query);

    if (!validation.success) {
      return res.status(400).json({ errors: validation.error.format() });
    }

    // Use var instead of const to avoid redeclaring id, c, and d
    var { id, c, d } = validation.data;

    // Convert Category and Difficulty to arrays if they are strings to standardize the data 
    // and make it easier for filtering with multiple values of c and d
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

    // Category can be an array but there should only be one difficulty per question
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

    var { id, title, desc, c, d } = validation.data;

    // Category can be an array but there should only be one difficulty per question
    if (typeof c === 'string') {
      c = [c];
    }

    const updatedQuestion: Partial<Question> = {
      questionId: new ObjectId(id),
      questionTitle: title,
      questionDescription: desc,
      questionCategory: c,
      questionComplexity: d,
    };

    const updateSuccessful: boolean = await updateQuestion(new ObjectId(id), updatedQuestion);

    if (updateSuccessful) {
      console.log('Question updated successfully');
    } else {
      console.log('Failed to update the question');
    }

    res.status(200).json(
      `Question with id ${id} updated with: 
        title: ${title}, 
        desc: ${desc}, 
        category: ${c}, 
        difficulty: ${d}`
    );
  }

  async delete(req: Request, res: Response) {
    const validation = deleteSchema.safeParse(req.query); 

    if (!validation.success) {
      return res.status(400).json({ errors: validation.error.format() });
    }

    const { id } = validation.data;

    const deleteSuccessful: boolean = await deleteQuestion(new ObjectId(id));

    if (deleteSuccessful) {
      console.log('Question deleted successfully');
    } else {
      console.log('Failed to delete the question');
    }

    res.status(200).json(`Question with id ${id} has been deleted.`);
  }
}

export const questionController = new QuestionController();
