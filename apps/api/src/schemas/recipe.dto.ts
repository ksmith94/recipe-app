import { z } from 'zod';

export const InstructionDTO = z.object({
  stepNumber: z.number().int().positive(),
  instruction: z.string(),
});

export const RecipeDetailDTO = z
  .object({
    id: z.uuid(),
    title: z.string(),
    description: z.string().default(''),
    prepTime: z.number().int().min(0),
    cookTime: z.number().int().min(0),
    effortLevel: z.number().int().min(1).max(5),
    servings: z.number(),
    imageUrl: z.url().nullable().optional(),
    // averageRating: z.number(),
    ingredients: z.array(z.string()),
    instructions: z.array(InstructionDTO),
    // tags: z.array(z.string()).default([]),
  })
  .refine((r) => (r.prepTime ?? 0) + (r.cookTime ?? 0) > 0, {
    message: 'prepTime and cookTime cannot both be 0',
  });

export type RecipeDetailDTO = z.infer<typeof RecipeDetailDTO>;
