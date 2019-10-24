const sha256 = require('js-sha256');
const SALT = 'lawyers'

module.exports = (db) => {


    let loginControllerCallback = (request, response) => {
        console.log(sha256('kenny'+SALT))

        response.render('associate_login')
    };

    let verifyControllerCallback = (request,response)=>{

        db.associates.verifyAssociate(request,(err,result)=>{

            if (result != null) {
                response.cookie('name', result.aname)
                response.cookie('id',result.id)
                let id = result.id.toString()
                let hashLogin = sha256(SALT + id)
                response.cookie('loggedin',hashLogin)

                const info = {
                    name: result.aname
                }

                response.redirect('/billables')
            } else {
                const info = {
                    fail: true
                }
                response.render('associate_login',info)
            }
        })
    }

     let apageControllerCallback = (request, response) => {
        let name = request.cookies.name

         db.associates.associateProjects(request,(err,result)=>{
            if (result!=null){
                console.log(result)
                var info = {
                    projects:result,
                    name
                }

            } else {
                info = {
                    none: true,
                    name
                }
            }

        response.render('associatepage', info)
        })
    };

    // let aProjectsControllerCallback = (request,response)=>{
    //     let name = request.cookies.name
    //     db.associates.associateProjects(request,(err,result)=>{
    //         if (result!=null){
    //             console.log(result)

    //             const info = {
    //                 projects:result,
    //                 name
    //             }

    //         } else {
    //             const info = {
    //                 none: true,
    //                 name
    //             }
    //         }
    //     })
    // }

    // let logoutControllerCallback = (request,response)=>{
    //     response.clearCookie('id');
    //     response.clearCookie('loggedin');
    //     response.clearCookie('name');

    //     response.redirect('/login')
    // }

  return {

    login: loginControllerCallback,
    verify: verifyControllerCallback,
    apage: apageControllerCallback
    // logout: logoutControllerCallback
  }
}