import { paginate, resolver } from 'blitz';
import db, { Prisma } from 'db';

interface GetIdeasInput
  extends Pick<Prisma.IdeaFindManyArgs, 'where' | 'orderBy' | 'skip' | 'take'> {}

export default resolver.pipe(
  async ( { where, orderBy, skip = 0, take = 100 }: GetIdeasInput ) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const { items: ideas, hasMore, nextPage, count } = await paginate( {
      skip,
      take,
      count: () => db.idea.count( { where } ),
      query: ( paginateArgs ) => db.idea.findMany( { ...paginateArgs, where, orderBy } ),
    } );

    return {
      ideas,
      nextPage,
      hasMore,
      count,
    };
  }
);
