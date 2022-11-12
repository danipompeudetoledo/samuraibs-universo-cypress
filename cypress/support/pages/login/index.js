
import { el } from './elements'
import toast from '../../components/toast'

class LoginPage{

    constructor(){
        this.toast = toast

    }

    

    go(){
        cy.visit('http://localhost:3000')
    }
    form(user){
        cy.get(el.email)
            .clear()
            .type(user.email)
            .clear
        cy.get(el.password).type(user.password)

    }

    submit(){
        cy.contains(el.signIn)
        .click()
    }

    alertHaveText(expectedtext){
        cy.contains(el.alertError,expectedtext)
            .should('be.visible')

    }





}


export default new LoginPage()