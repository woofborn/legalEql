const sha256 = require('js-sha256');
const SALT = 'lawyers'

module.exports = (db) => {

    let landingControllerCallback = (request,response) =>{
        response.render('landing')
    }

    let loginControllerCallback = (request, response) => {
        console.log(request.cookies.loggedin)
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

    let logoutControllerCallback = (request,response)=>{
        response.clearCookie('id');
        response.clearCookie('loggedin');
        response.clearCookie('name');

        response.redirect('/')
    }

  return {
    landing: landingControllerCallback,
    login: loginControllerCallback,
    verify: verifyControllerCallback,
    logout: logoutControllerCallback
  }
}