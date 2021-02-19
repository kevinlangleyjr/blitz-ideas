import { resolver } from 'blitz';
import db from 'db';
import * as z from 'zod';

const DeleteIdea = z.object( {
  id: z.number(),
} ).nonstrict();

export default resolver.pipe(
  resolver.zod( DeleteIdea ),
  resolver.authorize(),
  async ( { id } ) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const idea = await db.idea.deleteMany( { where: { id } } );

    return idea;
  },
);
