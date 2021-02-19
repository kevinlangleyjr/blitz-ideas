import { resolver } from 'blitz';
import db from 'db';
import * as z from 'zod';

const DeleteComment = z.object( {
  id: z.number(),
} ).nonstrict();

export default resolver.pipe(
  resolver.zod( DeleteComment ),
  resolver.authorize(),
  async ( { id } ) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const comment = await db.comment.deleteMany( { where: { id } } );

    return comment;
  },
);
