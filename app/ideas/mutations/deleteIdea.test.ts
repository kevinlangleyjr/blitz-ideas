import {
  AuthorizationError,
  Ctx,
} from 'blitz';
import deleteIdea from './deleteIdea';
import db from 'db';

const testIdea = {
  title: 'Libero morbi malesuada',
  body: 'Aliquam felis commodo aenean himenaeos malesuada mi elit fringilla litora.',
};

beforeEach( async () => {
  await db.$reset();
} );

jest.mock( 'blitz', () => ( {
  ...jest.requireActual( 'blitz' )!,
} ) );

describe( 'deleteIdea mutation', () => {
  it( "does throw error if user isn't logged in", async () => {
    const user = await db.user.create( {
      data: {
        name: 'Test User',
        email: 'user@example.com',
      },
    } );

    const idea = await db.idea.create( {
      data: {
        ...testIdea,
        userId: user.id,
      },
    } );

    await expect( deleteIdea( { id: idea.id }, {} as Ctx ) ).rejects.toThrowError();
  } );

  it( 'does throw error if user is logged in as user and attempting to delete another users idea', async () => {
    // Create test user.
    const user = await db.user.create( {
      data: {
        name: 'Test User',
        email: 'user@example.com',
      },
    } );

    // Create second test user.
    const user2 = await db.user.create( {
      data: {
        name: 'Test User Jr.',
        email: 'user2@example.com',
      },
    } );

    // Create test idea.
    const idea = await db.idea.create( {
      data: {
        ...testIdea,
        userId: user.id,
      },
    } );

    // Attempt to delete the idea as another user that is not an ADMIN.
    expect( deleteIdea(
      { id: idea.id },
      {
        session: {
          userId: user2.id,
          $authorize: () => undefined
        }
      }  as Ctx
    ) ).rejects.toThrowError( AuthorizationError );
  } );

  it( 'works correctly when user is logged in and deleting their own idea', async () => {
    // Create test user.
    const user = await db.user.create( {
      data: {
        name: 'Test User',
        email: 'user@example.com',
      },
    } );

    // Create test idea.
    const idea = await db.idea.create( {
      data: {
        ...testIdea,
        userId: user.id,
      },
    } );

    const result = await deleteIdea(
      { id: idea.id },
      {
        session: {
          userId: user.id,
          $authorize: () => undefined
        }
      }  as Ctx
    );

    // Check the result.
    expect( result ).toEqual( { count: 1 } );
  } );

  it( 'works correctly when user is logged in as ADMIN and deleting another users idea', async () => {
    // Create test user.
    const user = await db.user.create( {
      data: {
        name: 'Test User',
        email: 'user@example.com',
      },
    } );

    // Create test admin.
    const admin = await db.user.create( {
      data: {
        name: 'Test User',
        email: 'admin@example.com',
        role: 'ADMIN',
      },
    } );

    // Create test idea.
    const idea = await db.idea.create( {
      data: {
        ...testIdea,
        userId: user.id,
      },
    } );

    // Attempt to delete idea as ADMIN.
    const result = await deleteIdea(
      { id: idea.id },
      {
        session: {
          role: 'ADMIN',
          userId: admin.id,
          $authorize: () => undefined
        }
      }  as Ctx
    );

    // Check the result.
    expect( result ).toEqual( { count: 1 } );
  } );

} );
