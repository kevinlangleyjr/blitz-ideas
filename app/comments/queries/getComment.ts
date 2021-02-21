import { resolver, NotFoundError } from 'blitz';
import db  from 'db';
import * as z from 'zod';

const GetComment = z.object( {
  // This accepts type of undefined, but is required at runtime
  id: z.number().optional().refine( Boolean, 'Required' ),
} );

export default resolver.pipe(
  resolver.zod( GetComment ),
  async ( { id } ) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const comment = await db.comment.findFirst( { where: { id } } );

    if ( ! comment ) {
      throw new NotFoundError();
    };

    return comment;
  }
);
