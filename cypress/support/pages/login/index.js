
import { el } from './elements'
import toast from '../../components/toast'
import alert from '../../components/alert'

class LoginPage{

    constructor(){
        this.toast = toast
        this.alert = alert

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

  





}


export default new LoginPage()