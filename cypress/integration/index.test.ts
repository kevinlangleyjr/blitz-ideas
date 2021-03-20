import { createRandomUser } from '../support/helpers';

describe( 'index page', () => {
  beforeEach( () => {
    cy.visit( '/' );
  } );

  it( 'goes to the signup page', () => {
    cy.contains( 'a', /Sign Up/i ).click();
    cy.wait( 1000 );
    cy.location( 'pathname' ).should( 'equal', '/signup' );
  } );

  it( 'goes to the login page', () => {
    cy.contains( 'a', /Login/i ).click();
    cy.wait( 1000 );
    cy.location( 'pathname' ).should( 'equal', '/login' );
  } );

  it( 'allows the user to signup', () => {
    const user = createRandomUser();

    cy.signup( user );
    cy.wait( 1000 );

    cy.location( 'pathname' ).should( 'equal', '/' );
    cy.logout();
  } );

  it( 'allows the user to log in', () => {
    const user = createRandomUser();

    cy.signup( user );
    cy.wait( 1000 );

    cy.get( '.user-menu-button' ).click();
    cy.contains( 'button', /Sign out/i ).click();

    cy.wait( 1000 );

    cy.login( user );

    cy.location( 'pathname' ).should( 'equal', '/' );
    cy.wait( 1000 );
    cy.logout();
  } );

  it( 'allows the user to logout', () => {
    const user = createRandomUser();

    cy.signup( user );
    cy.wait( 1000 );

    cy.logout();

    cy.location( 'pathname' ).should( 'equal', '/' );
    cy.wait( 1000 );
    cy.contains( 'a', /Login/i );
  } );

  it( 'redirects to login when click submit idea button', () => {
    cy.contains( 'a', /Submit an Idea/i ).click();
    cy.wait( 1000 );
    cy.contains( 'h2', /Sign in to your account/i );
  } );
} );

export { };
