import signupPage from '../support/pages/signup'


describe("cadastro", function () {
  context("Quando o usuario é novato", function () {
    // definindo a massa de testes
    const user = {
      name: "Danilo",
      email: "dani@gmail.com",
      password: "pwd123",
    };

    before(function () {
      // removendo o usuario para que a massa seja sempre válida
      cy.task("removeUser", user.email)
        .then(function (result) {
          console.log(result);
        });
    });

    it("Deve cadastrar com sucesso ", function () {
      signupPage.go()
      signupPage.form(user)
      signupPage.submit()
      signupPage.toast.shouldtHaveText('Agora você se tornou um(a) Samurai, faça seu login para ver seus agendamentos!')

    });
  });


  context('Quando o email já existe', function () {
    const user = {
      name: "João Lucas",
      email: "joao@samuraibs.com",
      password: "pwd123",
      is_provider: true,
    };

    before(function () {
      cy.task("removeUser", user.email).then(function (result) {
        console.log(result);
      });

      cy.request("POST", "http://localhost:3333/users", user).then(function (
        response
      ) {
        expect(response.status).to.eq(200);
      });

    })
    it("Não deve cadastrar o usuário", function () {

      signupPage.go()
      signupPage.form(user)
      signupPage.submit()
      signupPage.toast.shouldtHaveText('Email já cadastrado para outro usuário.')
    })


  })


  context('quando o email é incorreto', function () {

    const user = {
      name: "Elizabeth Olsen",
      email: "liza.yahoo.com",
      password: "pwd123",

    }

    it('Deve exibir mensagem de alerta', function () {
      signupPage.go()
      signupPage.form(user)
      signupPage.submit()
      signupPage.alertHaveText('Informe um email válido')


    })


  })


  context('quando a senha é muito curta', function () {

    const passwords = ['1', '2a', 'ab3', 'abc4', 'ab#c5']

    // beforeEach é o gancho que é executado uma vez para cada dentro do contexto ou do describe
    beforeEach(function () {
      signupPage.go()
    })

    // essa função vai percorrer pelo array de senhas
    passwords.forEach(function (p) {
      it('não deve cadastrar com a senha: ' + p, function () {
        const user = { name: 'Jason Friday', email: 'jason@gmail.com', 'password': p}


        signupPage.form(user)
        signupPage.submit()

      })

    })

    afterEach(function () {
      signupPage.alertHaveText('Pelo menos 6 caracteres')

    })





  })

  context.only('quando não preenho nenhum dos campos',function(){

    const alertMessages =[
      'Nome é obrigatório',
      'E-mail é obrigatório',
      'Senha é obrigatória',
    ]

    before(function(){
      signupPage.go()
      signupPage.submit()
    })

    alertMessages.forEach(function(alert){

      it('deve exibir ' + alert.toLowerCase(),function(){
        signupPage.alertHaveText(alert)


      })

    })



  })



});
