import { Ctx, resolver } from 'blitz';
import db from 'db';
import * as z from 'zod';

const CreateIdea = z.object( {
  title: z.string(),
  body: z.string(),
} ).nonstrict();

export default resolver.pipe(
  resolver.zod( CreateIdea ),
  resolver.authorize(),
  async ( input, ctx: Ctx ) => {
    if ( ! ctx.session.userId ) {
      return;
    }

    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const idea = await db.idea.create( { data: {
      ...input,
      author: {
        connect: {
          id: ctx.session.userId,
        },
      },
    } } );

    return idea;
  },
);
