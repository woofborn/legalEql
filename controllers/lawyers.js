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

                const info = {
                    name: result.name
                }

                response.render('partner', info)
            } else {
                response.send('nope')
            }
        })
    }

     let newProjectControllerCallback = (request,response)=>{

            db.lawyers.newProject(request,(project)=>{
                console.log('newproject' + project.id, project.name)
                const info = {
                    id: project.id,
                    name: project.name,

                }

                response.redirect(`/projects/${project.id}`)

            })
        }

        let projectControllerCallback = (request,response)=>{

        // db.lawyers.verifyLogin(request,(err,result)=>{
            response.send(`this is project number ${request.params.id}`)


        // })
    }

  return {
    login: loginControllerCallback,
    verify: verifyControllerCallback,
    newProject: newProjectControllerCallback,
    project: projectControllerCallback
  }

}