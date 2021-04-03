import { Ctx, resolver } from 'blitz';
import db from 'db';
import * as z from 'zod';

const CreateComment = z.object( {
  body: z.string(),
  ideaId: z.number(),
} ).nonstrict();

export default resolver.pipe(
  resolver.zod( CreateComment ),
  resolver.authorize(),
  async ( input, ctx: Ctx ) => {
    if ( ! ctx.session.userId ) {
      return;
    }

    const comment = await db.comment.create( {
      data: {
        ...input,
        authorId: ctx.session.userId,
      }
    } );

    return comment;
  },
);
