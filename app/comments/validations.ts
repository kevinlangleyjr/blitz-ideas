import * as z from 'zod';

export const CreateComment = z.object( {
  body: z.string(),
} ).nonstrict();

export const DeleteComment = z.object( {
  id: z.number(),
} ).nonstrict();
