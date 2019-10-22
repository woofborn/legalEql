const sha256 = require('js-sha256');

module.exports = (db) => {

    let loginControllerCallback = (request, response) => {
        response.render('login')
    };

    let verifyControllerCallback = (request,response)=>{

        db.lawyers.verifyLogin(request,(err,result)=>{

            if (result != null) {
                response.cookie('username',result.username)
                response.cookie('id',result.id)

                response.send('yay logged in')
            } else {
                response.send('nope')
            }


        })




    }

  return {
    login: loginControllerCallback,
    verify: verifyControllerCallback
  }

}