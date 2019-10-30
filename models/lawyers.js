module.exports = (dbPoolInstance) => {


    let newProject = (request,callback)=>{


        let project = request.body.name
        let summary = request.body.summary
        let partnerId = request.cookies.id


//project name entered has capitalised first letter
        function titleCase(str) {
           var splitStr = str.toLowerCase().split(' ');
           for (var i = 0; i < splitStr.length; i++) {

               splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
               }

               return splitStr.join(' ');
            }

        let upper = titleCase(project);

        //check if project name already taken
       let query = `SELECT * FROM projects WHERE name = '${upper}'`


        dbPoolInstance.query(query,(err,result)=>{


            if (result.rows.length>0 && result.rows[0].name === upper){
                 // response.send("Be more creative - that one's been taken.")

                 callback(null)
            } else {

                let query = `INSERT INTO projects (name,description,partner_id) VALUES ('${upper}','${summary}',${partnerId}) RETURNING *`;


                    dbPoolInstance.query(query,(err,result)=>{


                    callback(result.rows[0])
                })
            }
        })
    }

    //get all associates that aren't already assigned to 3 or more projects
    let associates = (request,callback)=>{

        let query = `SELECT associates.id, associates.aname,associates.area,associates.location FROM associates LEFT JOIN (SELECT result.id, count(result.id) FROM (SELECT associates.id, associates.aname,associates.area,associates.location, project_assignment.project_name FROM associates LEFT JOIN project_assignment ON (project_assignment.associate_id = associates.id)) AS result GROUP BY result.id ) as bigResult ON (bigResult.id = associates.id) WHERE bigResult.count<3`


        dbPoolInstance.query(query,(err,result)=>{

            callback(result.rows)
        })
    }

    //add associates to team
    let addTeam = (request,callback)=>{

        let project = request.body.project_associateid[0]
        let partner = request.cookies.id;
        let associate = request.body.project_associateid[1]

        //check if that associate is already on your team
        let query = `SELECT * FROM project_assignment WHERE project_name = '${project}' AND associate_id = ${associate}`


        dbPoolInstance.query(query,(err,result)=>{


            if (result.rows.length>0){
                callback(null)
            } else {
                let query = `INSERT INTO project_assignment (associate_id, project_name) VALUES (${associate},'${project}') RETURNING *`


                dbPoolInstance.query(query,(err,result)=>{

                    callback(result.rows[0])
                })
            }
        })
    }

    let nameAssociate = (request,callback)=>{
        //don't forget the associates name!
        let associate = request.body.project_associateid[1]
        let query = `SELECT associates.aname FROM associates INNER JOIN project_assignment ON (associates.id = project_assignment.associate_id) WHERE associates.id = ${associate}`



        dbPoolInstance.query(query,(err,result)=>{

            callback(result.rows[0])
        })

    }


    let allTeam = (project,callback)=>{

        let query = `SELECT associates.id, associates.aname, associates.area, associates.location, partners.pname, projects.name, projects.description FROM project_assignment INNER JOIN associates ON (associates.id = project_assignment.associate_id) INNER JOIN projects ON (projects.name = project_assignment.project_name) INNER JOIN partners ON (partners.id = projects.partner_id) WHERE project_name = '${project}'`



        dbPoolInstance.query(query,(err,result)=>{

            callback(result.rows)
        })
    }

    let allProjects = (request,callback)=>{
        let partnerId = request.cookies.id

        let query = `SELECT projects.name,projects.description,result.sum FROM projects LEFT JOIN (SELECT projects.name, sum(hours) FROM projects INNER JOIN billables ON (projects.name = billables.project_name) GROUP BY projects.name) as result ON (projects.name = result.name) WHERE partner_id = ${partnerId} AND complete = false `


        dbPoolInstance.query(query,(err,result)=>{
            callback(result.rows)
        })
    }

     let completeProjects = (request,callback)=>{
        let partnerId = request.cookies.id

        let query = `SELECT name FROM projects  WHERE partner_id = ${partnerId} AND complete = true`


        dbPoolInstance.query(query,(err,result)=>{
            callback(result.rows)
        })

    }

    let showDescription = (project,callback)=>{
        let query = `SELECT * FROM projects WHERE name = '${project}'`
         dbPoolInstance.query(query,(err,result)=>{
            callback(result.rows[0])
        })

    }

    let complete = (request,callback)=>{
        let projectName = request.params.name


        let query = `UPDATE projects SET complete = true WHERE name = '${projectName}'`


         dbPoolInstance.query(query,(err,result)=>{

            let query = `DELETE from project_assignment WHERE project_name = '${projectName}'`

            dbPoolInstance.query(query,(err,result)=>{

                callback("Updated and deleted!")
            })

        })
    }


    let removeAssociate = (request,callback)=>{
        let project = request.body.id_project[1]
        let associate = request.body.id_project[0]


        let query = `DELETE FROM project_assignment WHERE associate_id = ${associate} AND project_name = '${project}'`


          dbPoolInstance.query(query,(err,result)=>{
            callback("Guess the associate burned out")
        })
    }
//autogenerate your team!
    let autoPop = (request,callback)=>{

        let location = request.body.location
        let associateNum = request.body.associates
        let project = request.params.projectname

        function titleCase(str) {
           var splitStr = str.toLowerCase().split(' ');
           for (var i = 0; i < splitStr.length; i++) {

               splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
               }

               return splitStr.join(' ');
            }

        let upper = titleCase(location);



        let query = `SELECT associates.id, associates.aname, associates.area,associates.location, result.sum FROM associates LEFT JOIN (SELECT associate_id, SUM(hours) FROM billables GROUP BY associate_id) as result ON (result.associate_id = associates.id) WHERE location = '${upper}' ORDER BY sum ASC NULLS FIRST LIMIT ${associateNum}`

        dbPoolInstance.query(query,(err,result)=>{



            let autoTeam = []

            for (let i=0;i<result.rows.length;i++){

                let query = `INSERT INTO project_assignment (associate_id,project_name) VALUES (${result.rows[i].id},'${project}') RETURNING *;`


                dbPoolInstance.query(query,(err,result)=>{

                    autoTeam.push(result.rows)
                 })
            }

            let delaysend = ()=>{callback(autoTeam)}
            setTimeout(delaysend,2000)


        })
    }




    return{
        newProject,
        associates,
        addTeam,
        nameAssociate,
        allTeam,
        allProjects,
        completeProjects,
        complete,
        removeAssociate,
        showDescription,
        autoPop

    }
}