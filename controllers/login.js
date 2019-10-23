const sha256 = require('js-sha256');
const SALT = 'lawyers'

module.exports = (db) => {

    let loginControllerCallback = (request, response) => {
        response.render('login')
    };

    let verifyControllerCallback = (request,response)=>{

        db.login.verifyLogin(request,(err,result)=>{

            if (result != null) {
                response.cookie('name', result.pname)
                response.cookie('id',result.id)
                let id = result.id.toString()
                let hashLogin = sha256(SALT + id)
                response.cookie('loggedin',hashLogin)

                const info = {
                    name: result.pname
                }

                response.redirect('/projects')
            } else {
                const info = {
                    fail: true
                }

                response.render('login',info)
            }
        })
    }

  return {
    login: loginControllerCallback,
    verify: verifyControllerCallback,

  }

}