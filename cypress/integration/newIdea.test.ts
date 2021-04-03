import { createRandomUser } from '../support/helpers';

describe( 'create new idea', () => {
    it( 'allows you to navigate to the new idea page if logged in', () => {
        cy.visit( '/' );
        const user = createRandomUser();

        cy.signup( user );
        cy.wait( 1000 );

        cy.contains( 'a', /Submit an Idea/i ).click();
        cy.wait( 1000 );

        cy.contains( 'h1', 'Create New Idea' );
        cy.get( 'form' ).find( 'input[name="title"]' ).type( 'Test title' );
        cy.get( 'form' ).find( 'textarea[name="body"]' ).type( 'This is a test idea!' );
        cy.contains( 'button', /Create Idea/i ).click();
        cy.wait( 1000 );
        cy.contains( 'h2', 'Test title' );
    } );
} );

export { };
