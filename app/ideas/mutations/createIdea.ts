import { Ctx, resolver } from 'blitz';
import db from 'db';
import { CreateIdea } from 'app/ideas/validations';

export default resolver.pipe(
  resolver.zod( CreateIdea ),
  resolver.authorize(),
  async ( input, ctx: Ctx ) => {
    if ( ! ctx.session.userId ) {
      return;
    }

    const idea = await db.idea.create( { data: {
      ...input,
      authorId: ctx.session.userId,
    } } );

    return idea;
  },
);
