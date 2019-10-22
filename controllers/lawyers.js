const sha256 = require('js-sha256');

module.exports = (db) => {

    let loginControllerCallback = (request, response) => {
        response.render('login')
    };

    let verifyControllerCallback = (request,response)=>{

        db.lawyers.verifyLogin(request,(err,result)=>{

            if (result != null) {
                response.cookie('name', result.name)
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

                response.redirect(`/projects/${project.name}`)

            })
        }

    let projectControllerCallback = (request,response)=>{

        const info = {
            name: request.params.name,
             partner: request.cookies.name
        }
        response.render('project', info)

    }

    let associatesControllerCallback = (request,response)=>{

         db.lawyers.associates(request,(associates)=>{
                 // response.send(associates)\

                 const info = {
                    associates,
                 }

                 response.render('associates',info)
            })
    }

  return {
    login: loginControllerCallback,
    verify: verifyControllerCallback,
    newProject: newProjectControllerCallback,
    project: projectControllerCallback,
    associates: associatesControllerCallback
  }

}