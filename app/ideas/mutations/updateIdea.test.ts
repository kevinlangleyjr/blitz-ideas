import {
  AuthorizationError,
  Ctx,
} from 'blitz';
import updateIdea from './updateIdea';
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

describe( 'updateIdea mutation', () => {
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

    await expect( updateIdea( {
      id: idea.id,
      title: 'Updated title',
      body: 'Updated body',
    }, {} as Ctx ) ).rejects.toThrowError();
  } );

  it( 'does throw error if user is logged in as user and attempting to update another users idea', async () => {
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
    expect( updateIdea(
      {
        id: idea.id,
        title: 'Updated Title',
        body: 'Updated body',
      },
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

    const result = await updateIdea(
      {
        id: idea.id,
        title: 'Updated Title',
        body: 'Updated Body',
      },
      {
        session: {
          userId: user.id,
          $authorize: () => undefined
        }
      }  as Ctx
    );

    // Check the result.
    expect( result ).toEqual( expect.objectContaining( {
      ...testIdea,
      title: 'Updated Title',
      body: 'Updated Body',
    } ) );
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
    const result = await updateIdea(
      {
        id: idea.id,
        title: 'Updated Title',
        body: 'Updated Body',
      },
      {
        session: {
          role: 'ADMIN',
          userId: admin.id,
          $authorize: () => undefined
        }
      }  as Ctx
    );

    // Check the result.
    expect( result ).toEqual( expect.objectContaining( {
      ...testIdea,
      title: 'Updated Title',
      body: 'Updated Body',
    } ) );
  } );

} );
