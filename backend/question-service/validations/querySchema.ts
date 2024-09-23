import { z } from "zod";
import { Difficulty } from "../types/types.js";

// id is optional and must be able to be converted to a number
// c (category) is optional and must be a string or an array of strings
// d (difficulty) is optional and must be a string or array of "easy", "medium", or "hard"
export const querySchema = z.object({
  id: z
    .string()
    .optional()
    .refine((val) => !val || !isNaN(Number(val)), {
      message: "ID must be a number",
    }),
  c: z.union([z.string(), z.array(z.string())]).optional(),
  d: z
    .union([z.nativeEnum(Difficulty), z.array(z.nativeEnum(Difficulty))])
    .optional(),
});
