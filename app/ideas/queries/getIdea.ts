import { resolver, NotFoundError } from 'blitz';
import db  from 'db';
import * as z from 'zod';

const GetIdea = z.object( {
  // This accepts type of undefined, but is required at runtime
  id: z.number().optional().refine( Boolean, 'Required' ),
} );

export default resolver.pipe(
  resolver.zod( GetIdea ),
  async ( { id } ) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const idea = await db.idea.findFirst( { where: { id } } );

    if ( ! idea ) {throw new NotFoundError();}

    return idea;
  }
);
