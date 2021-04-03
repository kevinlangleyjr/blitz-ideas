import { createIdea, createRandomUser } from '../support/helpers';

describe( 'create new idea', () => {
    it( 'allows you to submit a new idea if logged in', () => {
        cy.visit( '/' );
        const user = createRandomUser();

        cy.signup( user );
        cy.wait( 1000 );

        [ ...Array( 15 ) ].map( ( _, i ) => {
            const idea = createIdea();
            cy.contains( 'a', /Submit an Idea/i ).click();
            cy.wait( 1000 );

            cy.submitIdea( idea );
            cy.wait( 1000 );
            cy.contains( 'h1', idea.title );
            cy.contains( 'p', idea.body );
        } );
    } );
} );

export { };
