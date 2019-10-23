module.exports = (db) => {


    let partnerControllerCallback = (request,response)=>{

         db.lawyers.allProjects(request,(name)=>{

            const data = {
                projectList: name,
                name: request.cookies.name
            }

            response.render('partner',data)
        })
    }

     let newProjectControllerCallback = (request,response)=>{

            db.lawyers.newProject(request,(project)=>{

                if (project === null){

                      db.lawyers.allProjects(request,(name)=>{

                            const data = {
                                projectList: name,
                                name: request.cookies.name,
                                unique: false,
                            }

                        response.render('partner',data)
                      })

                } else {
                    console.log('newproject' + project.id, project.name)
                    const info = {
                        id: project.id,
                        name: project.name,

                    }
                    response.redirect(`/projects/${project.name}`)
                }
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

    // let allProjectsControllerCallback = (request,response)=>{

    //     db.lawyers.allProjects(request,(name)=>{
    //         const data = {
    //             projectList: result.rows
    //         }

    //     })
    // }

  return {

    newProject: newProjectControllerCallback,
    project: projectControllerCallback,
    associates: associatesControllerCallback,
    addTeam: addTeamControllerCallback,
    partnerPage: partnerControllerCallback
  }

}