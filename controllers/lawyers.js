const sha256 = require('js-sha256');
const SALT = 'lawyers'

module.exports = (db) => {


    let partnerControllerCallback = (request,response)=>{

        if (request.cookies.loggedin != undefined){
            let id = request.cookies.id.toString()
            let hashLogin = sha256(SALT + id)
            let hashCheese = sha256('cheese' + id)

            if (request.cookies.loggedin === hashLogin && request.cookies.cheese === hashCheese){
                db.lawyers.allProjects(request,(project)=>{
                    console.log('PROJECT CALLBACK RESULTTSSSSSSSS')
                    console.log(project)

                    db.lawyers.completeProjects(request,(completed)=>{
                    console.log(completed)


                    const data = {
                        name: request.cookies.name,
                        project,
                        completed
                    }


                    response.render('partner',data)

                    })


                })
            } else {
                response.send("STOP TRYING TO SPY ON PARTNERS")
            }
        } else {
            const info ={
                login: false
            }
            response.render('login',info)
        }
    }

     let newProjectControllerCallback = (request,response)=>{

            db.lawyers.newProject(request,(project)=>{
                console.log(project)
                if (project === null){

                      db.lawyers.allProjects(request,(name)=>{


                        db.lawyers.completeProjects(request,(completed)=>{

                                const data = {
                                    project: name,
                                    name: request.cookies.name,
                                    unique: false,
                                    completed,
                                }

                            response.render('partner',data)
                        })
                      })

                } else {
                    console.log('NEW PROJECTTTTTTTT')
                    console.log(project.id, project.name, project.description)
                    const info = {
                        id: project.id,
                        name: project.name,

                    }
                    console.log(info)
                    response.redirect(`/projects/${project.name}`)
                }
            })
        }

    let projectControllerCallback = (request,response)=>{

       let project = request.params.name

        db.lawyers.allTeam(project,(team)=>{
            console.log('OMG TEAMAMAMAMAMAMAAM')
            console.log(team)
            db.lawyers.showDescription(project,(project)=>{

                const info = {
                name: request.params.name,
                partner: request.cookies.name,
                cheese: request.cookies.cheese,
                team: team,
                project: project
            }

        console.log(team, project)
         response.render('project', info)
        // response.send('you broke everything')

            })

        // response.send(team)
        })
    }

    let associatesControllerCallback = (request,response)=>{

        let projectName = request.params.projectname
         db.lawyers.associates(request,(associates)=>{
                 console.log(associates)
                 const info = {
                    associates,
                    projectName
                 }
                 response.render('associates',info)
            })
    }

    let addTeamControllerCallback = (request,response)=>{

        db.lawyers.addTeam(request,(team)=>{
            console.log("!!!RETURNED FROM NULL?")
            console.log(team)
            if (team === null){
                // response.send ("you've already added this associate, dingbat")
                let projectName = request.body.project_associateid[0]
                console.log(request.params.projectname)

                db.lawyers.associates(request,(associates)=>{
                 // response.send(associates)
                     const info = {
                        associates,
                        projectName,
                        selected:true
                     }
                 response.render('associates',info)
                })

            } else {

                db.lawyers.nameAssociate(request,(name)=>{
                    const info = {
                    associate: name.aname,
                    project:team.project_name
                    }
                    response.render('newmember',info)
                })
            }
        })
    }

    let removeControllerCallback = (request,response)=>{

        db.lawyers.removeAssociate(request, (message)=>{
            console.log(message);
            response.redirect("/projects/"+request.body.id_project[1])
        })


    }


    let completeControllerCallback = (request,response)=>{
        let projectName = request.params.name
        console.log('BANANANANANANANA')
        console.log(projectName)

        db.lawyers.complete(request, (message)=>{
            console.log(message);
            console.log("yay, completed")



              setTimeout(()=> {response.redirect("/projects");
            }, 500);
        })
    }

    let autoControllerCallback = (request,response)=>{
        console.log(request.body)
        response.send('autoteam!')

        //find associates in the location
        //order associates by billables
        //show number of associates requested
        //insert these associates into the projectassignment table


    }

  return {

    newProject: newProjectControllerCallback,
    project: projectControllerCallback,
    associates: associatesControllerCallback,
    addTeam: addTeamControllerCallback,
    partnerPage: partnerControllerCallback,
    complete: completeControllerCallback,
    remove: removeControllerCallback,
    auto: autoControllerCallback
  }

}