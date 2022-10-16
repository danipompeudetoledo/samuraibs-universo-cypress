it ('web app deve estar online', function(){
    
    //comentario
    cy.visit('http://localhost:3000/')

    cy.title()
        .should('eq', 'Samurai Barbershop by QAninja')

})
