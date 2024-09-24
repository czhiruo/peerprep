import { z } from "zod";
import { Difficulty } from "../models/question.js";
import { ObjectId } from "mongodb";

// id is optional and must be a valid MongoDB ObjectId
// c (category) is optional and must be a string or an array of strings
// d (difficulty) is optional and must be a string or array of "easy", "medium", or "hard"
export const querySchema = z.object({
  id: z.string().refine((val) => {
    return ObjectId.isValid(val);
  }, {
    message: "ID must be a valid MongoDB ObjectId",
  }).optional(),
  c: z.union([z.string(), z.array(z.string())]).optional(),
  d: z
    .union([z.nativeEnum(Difficulty), z.array(z.nativeEnum(Difficulty))])
    .optional(),
});

// title is required and must be a string
// desc is required and must be a string
// c (category) is required and must be a string or an array of strings
// d (difficulty) is required and must be a string of "easy", "medium", or "hard"
export const createSchema = z.object({
  title: z.string(),
  desc: z.string(),
  c: z.union([z.string(), z.array(z.string())]),
  d: z.nativeEnum(Difficulty),
});

// id is required and must be able to be converted to a number
// title is optional and must be a string
// desc is optional and must be a string
// c (category) is optional and must be a string or an array of strings
// d (difficulty) is optional and must be a string or array of "easy", "medium", or "hard"
export const updateSchema = z.object({
  id: z
    .string()
    .refine((val) => !val || !isNaN(Number(val)), {
      message: "ID must be a number",
    }),
  title: z.string().optional(),
  desc: z.string().optional(),
  c: z.union([z.string(), z.array(z.string())]).optional(),
  d: z
    .union([z.nativeEnum(Difficulty), z.array(z.nativeEnum(Difficulty))])
    .optional(),
});

// id is required and must be able to be converted to a number
export const deleteSchema = z.object({
  id: z
    .string()
    .refine((val) => !val || !isNaN(Number(val)), {
      message: "ID must be a number",
    }),
});