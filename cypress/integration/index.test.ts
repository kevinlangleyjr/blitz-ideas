import { createRandomUser } from '../support/helpers';

describe( 'index page', () => {
  beforeEach( () => {
    cy.visit( '/' );
  } );

  it( 'goes to the signup page', () => {
    cy.contains( 'a', /Sign Up/i ).click();
    cy.location( 'pathname' ).should( 'equal', '/signup' );
  } );

  it( 'goes to the login page', () => {
    cy.contains( 'a', /Login/i ).click();
    cy.location( 'pathname' ).should( 'equal', '/login' );
  } );

  it( 'allows the user to signup', () => {
    const user = createRandomUser();

    cy.signup( user );
    cy.wait( 1000 );

    cy.location( 'pathname' ).should( 'equal', '/' );
    cy.get( '.user-menu-button' ).click();
    cy.contains( 'button', /Sign out/i ).click();
  } );

  it( 'allows the user to log in', () => {
    const user = createRandomUser();

    cy.signup( user );
    cy.wait( 1000 );

    cy.get( '.user-menu-button' ).click();
    cy.contains( 'button', /Sign out/i ).click();

    cy.wait( 1000 );
    cy.contains( 'a', /Login/i ).click();

    cy.get( 'form' ).find( 'input[name="email"]' ).type( user.email );
    cy.get( 'form' ).find( 'input[name="password"]' ).type( user.password );
    cy.contains( 'button', /Login/i ).click();

    cy.location( 'pathname' ).should( 'equal', '/' );
    cy.wait( 1000 );
    cy.get( '.user-menu-button' ).click();
    cy.contains( 'button', /Sign out/i );
  } );

  it( 'allows the user to logout', () => {
    const user = createRandomUser();

    cy.signup( user );
    cy.wait( 1000 );

    cy.get( '.user-menu-button' ).click();

    cy.contains( 'button', /Sign out/i ).click();

    cy.location( 'pathname' ).should( 'equal', '/' );
    cy.wait( 1000 );
    cy.contains( 'a', /Login/i );
  } );
} );

export { };
