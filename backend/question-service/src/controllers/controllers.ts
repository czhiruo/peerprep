import { Request, Response } from "express";
import { Question } from "../models/question.js";
import { querySchema, ObjectIdSchema, createSchema, updateSchema } from "../validations/querySchema.js";
import { addQuestion, getQuestionById, getQuestionsByFilter, updateQuestion, deleteQuestion } from "../services/questionService.js";
import { ObjectId } from "mongodb";

class QuestionController {
  // Get all questions or filter
  async get(req: Request, res: Response) {
    const validation = querySchema.safeParse(req.query);

    if (!validation.success) {
      return res.status(400).json({ errors: validation.error.format() });
    }

    // Use var instead of const to avoid redeclaring id, c, and d
    var { c, d } = validation.data;

    // Convert Category and Difficulty to arrays if they are strings to standardize the data 
    // and make it easier for filtering with multiple values of c and d
    if (typeof c === 'string') {
      c = [c];
    }

    if (typeof d === 'string') {
      d = [d];
    }

    res.status(200).json(await getQuestionsByFilter(c, d));
  }

  // Get question by id
  async getById(req: Request, res: Response) {
    const validation = ObjectIdSchema.safeParse(req.params);

    // If the id is not a valid ObjectId, return a 400 status code
    if (!validation.success) {
      return res.status(400).json({ errors: validation.error.format() });
    }
    const id = validation.data.id;
    const question = await getQuestionById(new ObjectId(id));
    
    // If the question is not found, return a 404 status code
    if (!question) {
      return res.status(404).json({ error: "Question not found"});
    }
    res.status(200).json(question);
  }

  // Create a new question
  async create(req: Request, res: Response) {
    const validation = createSchema.safeParse(req.body);

    // If the request body does not match the schema, return a 400 status code
    if (!validation.success) {
      return res.status(400).json({ errors: validation.error.format() });
    }

    var { title, desc, c, d } = validation.data;

    const id = await addQuestion({
      questionTitle: title,
      questionDescription: desc,
      questionCategory: c,
      questionComplexity: d,
    });

    res.status(201).json(
      {
        "id": id,
        "title": title,
        "desc": desc,
        "c": c,
        "d": d
      }
    );
  }

  // Update a question
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

  // Delete a question
  async delete(req: Request, res: Response) {
    const validation = ObjectIdSchema.safeParse(req.params); 

    if (!validation.success) {
      return res.status(400).json({ errors: validation.error.format() });
    }

    const { id } = validation.data;

    const deleteSuccessful: boolean = await deleteQuestion(new ObjectId(id));

    if (!deleteSuccessful) {
      res.status(404).json({ error: "Question not found" });
      console.log(`Failed to delete the question with id ${id}`);
    }

    console.log(`Question with id ${id} deleted successfully`);
    res.status(204).json();
  }
}

export const questionController = new QuestionController();
