import dashPage from '../support/pages/dash'
import loginPage from '../support/pages/login'

describe('login', function () {

    context('quando o usuario é muito bom', function () {
        const user = {
            name: 'Robson Jassa',
            email: 'jassa@samuraibs.com',
            password: 'pwd123',
            is_provider: true,

        }

        before(function () {

            cy.postUser(user)


        })




        it('deve  logar com sucesso', function () {
            loginPage.go()
            loginPage.form(user)
            loginPage.submit()
            dashPage.header.userLoggedIn(user.name)




        })
    })

    context('quando o usuario é bom mas a senha é incorreta', function () {

        let user = {
            name: 'Celso Kamura',
            email: 'kamura@samuraibs.com',
            password: 'pwd123',
            is_provider: true


        }

        before(function () {
            cy.postUser(user).then(function () {
                user.password = '123'
            })
        })

        it('deve notificar erro de credenciais', function () {
            loginPage.go()
            loginPage.form(user)
            loginPage.submit()

            const message = 'Ocorreu um erro ao fazer login, verifique suas credenciais.'

            loginPage.toast.shouldtHaveText(message)

        })
    })

    context.only('quando o formato do email é invaido', function () {

        const emails = [
            'papito.com.br',
            'yahoo.com',
            '@gmail.com',
            "@",
            'papito@',
            '111',
            '&*^&^&*',
            'xpto123'
        ]

        before(function(){
            loginPage.go()
        })

        emails.forEach(function (email) {
            it('não deve logar com o email:' + email, function () {
                const user = { email: email, password: 'pwd123' }

                
                loginPage.form(user)
                loginPage.submit()
                loginPage.alertHaveText('Informe um email válido')
            })
        })

    })
})