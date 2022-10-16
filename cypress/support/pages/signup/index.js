import { el } from './elements'
import toast from '../../components/toast';

class SignupPage {

    // construtor é a função da classe que é executada(é invocada) automáticamente 
    // ao contrario das outras funções abaixo como a go, form. submit etc.

    constructor() {
        this.toast = toast
    }

    go() {
        cy.visit("http://localhost:3000/signup");

    }

    form(user) {

        cy.get(el.name).type(user.name);
        cy.get(el.email).type(user.email);
        cy.get(el.password).type(user.password);
    }

    submit() {
        cy.contains(el.signupButton).click();
    }

    alertHaveText(expectText) {
        cy.contains('.alert-error', expectText)
            .should('be.visible')
    }



}

export default new SignupPage()