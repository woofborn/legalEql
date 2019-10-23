const sha256 = require('js-sha256');

module.exports = (db) => {

    let loginControllerCallback = (request, response) => {
        response.render('login')
    };

    let verifyControllerCallback = (request,response)=>{

        db.lawyers.verifyLogin(request,(err,result)=>{

            if (result != null) {
                response.cookie('name', result.pname)
                response.cookie('id',result.id)
                response.cookie('loggedin','yay')

                const info = {
                    name: result.pname
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
       console.log(request.params.name)
       let project = request.params.name

        db.lawyers.allTeam(project,(team)=>{
            console.log('///////////')
            console.log(team)
            const info = {
                name: request.params.name,
                partner: request.cookies.name,
                team: team
            }
        response.render('project', info)
        // response.send(team)
        })
    }

    let associatesControllerCallback = (request,response)=>{
        console.log("///////////////////")
        console.log(request.params)
        console.log("///////////////////")
        let projectName = request.params.projectname
         db.lawyers.associates(request,(associates)=>{
                 // response.send(associates)
                 const info = {
                    associates,
                    projectName
                 }
                 response.render('associates',info)
            })
    }

    let addTeamControllerCallback = (request,response)=>{

        db.lawyers.addTeam(request,(team)=>{

            db.lawyers.nameAssociate(request,(name)=>{
                const info = {
                associate: name.aname,
                project:team.project_name
            }
            console.log('MEOWMOEMOWMOEWEWOM')
            console.log(team)
            console.log(name)
            response.render('newmember',info)


            })

        })

    }

  return {
    login: loginControllerCallback,
    verify: verifyControllerCallback,
    newProject: newProjectControllerCallback,
    project: projectControllerCallback,
    associates: associatesControllerCallback,
    addTeam: addTeamControllerCallback
  }

}