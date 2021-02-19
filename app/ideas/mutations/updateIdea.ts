import { resolver } from 'blitz';
import db from 'db';
import * as z from 'zod';

const UpdateIdea = z.object( {
  id: z.number(),
  title: z.string(),
  body: z.string(),
} ).nonstrict();

export default resolver.pipe(
  resolver.zod( UpdateIdea ),
  resolver.authorize(),
  async ( { id, ...data } ) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const idea = await db.idea.update( { where: { id }, data } );

    return idea;
  },
);
