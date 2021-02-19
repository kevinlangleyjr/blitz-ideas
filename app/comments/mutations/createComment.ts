import { resolver } from 'blitz';
import db from 'db';
import * as z from 'zod';

const CreateComment = z.object( {
  body: z.string(),
  ideaId: z.number(),
} ).nonstrict();

export default resolver.pipe(
  resolver.zod( CreateComment ),
  resolver.authorize(),
  async ( input ) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const comment = await db.comment.create( { data: input } );

    return comment;
  },
);
