import { el } from './elements'

class Alert{

    haveText(expectedtext){
        cy.contains(el.error,expectedtext)
            .should('be.visible')

    }

}

export default new Alert()