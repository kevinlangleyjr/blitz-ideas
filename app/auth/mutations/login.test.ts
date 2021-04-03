import { SecurePassword } from 'blitz';
import login from './login';
import db from 'db';

beforeEach( async () => {
  await db.$reset();
} );

const mockCtx: any = {
  session: {
    $create: jest.fn,
  },
};

describe( 'login mutation', () => {
  it( 'works correctly', async () => {
    // Create test user
    const user = await db.user.create( {
      data: {
        email: 'user@example.com',
        hashedPassword: await SecurePassword.hash( 'password123' ),
      },
    } );

    // Throw error on wrong password.
    await expect(
      login( { email: user.email, password: 'password' }, mockCtx )
    ).rejects.toThrowError();

    // Allow with correct credentials.
    await expect(
      login( { email: user.email, password: 'password123' }, mockCtx )
    );
  } );
} );
