import {
  AuthorizationError,
  Ctx,
  NotFoundError,
  resolver,
} from 'blitz';
import db from 'db';
import { DeleteIdea } from 'app/ideas/validations';

export default resolver.pipe(
  resolver.zod( DeleteIdea ),
  resolver.authorize(),
  async ( { id }, ctx: Ctx ) => {
    if ( ctx.session.role !== 'ADMIN' ) {
      const idea = await db.idea.findFirst( { where: { id } } );

      if ( ! idea ) {
        throw new NotFoundError();
      }

      if ( idea.userId !== ctx.session.userId ) {
        throw new AuthorizationError( 'You are not authorized to delete this idea.' );
      }
    }

    return await db.idea.deleteMany( { where: { id } } );
  },
);
