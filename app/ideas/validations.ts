import * as z from 'zod';

export const CreateIdea = z.object( {
  title: z.string(),
  body: z.string(),
} ).nonstrict();

export const UpdateIdea = z.object( {
  id: z.number(),
  title: z.string(),
  body: z.string(),
} ).nonstrict();

export const DeleteIdea = z.object( {
  id: z.number(),
} ).nonstrict();
