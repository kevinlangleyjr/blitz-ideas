import {
  AuthorizationError,
  Ctx,
  NotFoundError,
  resolver,
} from 'blitz';
import db from 'db';
import { UpdateIdea } from 'app/ideas/validations';

export default resolver.pipe(
  resolver.zod( UpdateIdea ),
  resolver.authorize(),
  async ( { id, ...data }, ctx: Ctx ) => {
    if ( ctx.session.role !== 'ADMIN' ) {
      const idea = await db.idea.findFirst( { where: { id } } );

      if ( ! idea ) {
        throw new NotFoundError();
      }

      if ( idea.authorId !== ctx.session.userId ) {
        throw new AuthorizationError( 'You are not authorized to edit this idea.' );
      }
    }

    return await db.idea.update( { where: { id }, data } );
  },
);
