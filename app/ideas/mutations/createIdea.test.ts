import { Ctx } from 'blitz';
import createIdea from './createIdea';
import db from 'db';

const testIdea = {
  title: 'Libero morbi malesuada',
  body: 'Aliquam felis commodo aenean himenaeos malesuada mi elit fringilla litora.',
};

beforeEach( async () => {
  await db.$reset();
} );

const generatedToken = 'plain-token';
jest.mock( 'blitz', () => ( {
  ...jest.requireActual<object>( 'blitz' )!,
  generateToken: () => generatedToken,
} ) );

describe( 'createIdea mutation', () => {
  it( "does throw error if user isn't logged in", async () => {
    await expect( createIdea( testIdea, {} as Ctx ) ).rejects.toThrowError();
  } );

  it( 'works correctly when user is logged in', async () => {
    // Create test user.
    const user = await db.user.create( {
      data: {
        name: 'Test User',
        email: 'user@example.com',
      },
    } );

    // Create test idea.
    const result = await createIdea(
      testIdea,
      {
        session: {
          userId: user.id,
          $authorize: () => undefined
        }
      }  as Ctx
    );

    // Check the result.
    expect( result ).toEqual( expect.objectContaining( testIdea ) );
  } );
} );
