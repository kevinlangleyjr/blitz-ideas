import signup from './signup';
import db from 'db';

beforeEach( async () => {
  await db.$reset();
} );

const mockCtx: any = {
  session: {
    $create: jest.fn,
  },
};

describe( 'signup mutation', () => {
  it( 'works correctly', async () => {
    // Fails on short password.
    await expect(
      signup( { email: 'new@email.com', password: 'password' }, mockCtx )
    ).rejects.toThrowError();

    // Create test user.
    await expect(
      signup( { email: 'new@email.com', password: 'password123' }, mockCtx )
    );

    // Non-unique email.
    await expect(
      signup( { email: 'new@email.com', password: 'password123' }, mockCtx )
    ).rejects.toThrowError();
  } );
} );
