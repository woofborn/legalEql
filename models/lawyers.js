module.exports = (dbPoolInstance) => {


    let newProject = (request,callback)=>{

        console.log('NEW PROJECT BEING ADDEDDDDDD')
        console.log(request.body)
        let project = request.body.name
        let summary = request.body.summary
        let partnerId = request.cookies.id
        console.log(project, summary)

        function titleCase(str) {
           var splitStr = str.toLowerCase().split(' ');
           for (var i = 0; i < splitStr.length; i++) {

               splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
               }
               // Directly return the joined string
               return splitStr.join(' ');
            }

        let upper = titleCase(project);

       let query = `SELECT * FROM projects WHERE name = '${upper}'`
       console.log('NEW PROJECT QUERY')
       console.log(query)

        dbPoolInstance.query(query,(err,result)=>{
            console.log(result.rows)

            if (result.rows.length>0 && result.rows[0].name === upper){
                 // response.send("Be more creative - that one's been taken.")
                 console.log(result.rows)
                 callback(null)
            } else {

                let query = `INSERT INTO projects (name,description,partner_id) VALUES ('${upper}','${summary}',${partnerId}) RETURNING *`;
                console.log(query)

                    dbPoolInstance.query(query,(err,result)=>{

                    console.log (result.rows[0])
                    callback(result.rows[0])
                })
            }
        })
    }


    let associates = (request,callback)=>{

        let query = `SELECT associates.id, associates.aname,associates.area,associates.location FROM associates LEFT JOIN (SELECT result.id, count(result.id) FROM (SELECT associates.id, associates.aname,associates.area,associates.location, project_assignment.project_name FROM associates LEFT JOIN project_assignment ON (project_assignment.associate_id = associates.id)) AS result GROUP BY result.id ) as bigResult ON (bigResult.id = associates.id) WHERE bigResult.count<3`
        console.log(query)

        dbPoolInstance.query(query,(err,result)=>{

            callback(result.rows)
        })
    }


    let addTeam = (request,callback)=>{
        console.log("REQUESTBODY!!!")
        console.log(request.body)
        let project = request.body.project_associateid[0]
        let partner = request.cookies.id;
        let associate = request.body.project_associateid[1]

        let query = `SELECT * FROM project_assignment WHERE project_name = '${project}' AND associate_id = ${associate}`


        dbPoolInstance.query(query,(err,result)=>{
            console.log("///RESULT OF ASSOCIATE SEARCH///")
            console.log(result.rows)

            if (result.rows.length>0){
                callback(null)
            } else {
                let query = `INSERT INTO project_assignment (associate_id, project_name) VALUES (${associate},'${project}') RETURNING *`
                console.log(query)

                dbPoolInstance.query(query,(err,result)=>{
                    console.log(result.rows[0])
                    callback(result.rows[0])
                })
            }
        })
    }

    let nameAssociate = (request,callback)=>{

        let associate = request.body.project_associateid[1]
        let query = `SELECT associates.aname FROM associates INNER JOIN project_assignment ON (associates.id = project_assignment.associate_id) WHERE associates.id = ${associate}`

        console.log(query)

        dbPoolInstance.query(query,(err,result)=>{
            console.log(result.rows[0])
            callback(result.rows[0])
        })

    }


    let allTeam = (project,callback)=>{

        let query = `SELECT associates.id, associates.aname, partners.pname, projects.name, projects.description FROM project_assignment INNER JOIN associates ON (associates.id = project_assignment.associate_id) INNER JOIN projects ON (projects.name = project_assignment.project_name) INNER JOIN partners ON (partners.id = projects.partner_id) WHERE project_name = '${project}'`

        console.log(query)

        dbPoolInstance.query(query,(err,result)=>{
            console.log(result.rows);
            callback(result.rows)
        })
    }

    let allProjects = (request,callback)=>{
        let partnerId = request.cookies.id

        let query = `SELECT * FROM projects  WHERE partner_id = ${partnerId} AND complete = false`
        console.log(query)

        dbPoolInstance.query(query,(err,result)=>{
            callback(result.rows)
        })
    }

     let completeProjects = (request,callback)=>{
        let partnerId = request.cookies.id

        let query = `SELECT name FROM projects  WHERE partner_id = ${partnerId} AND complete = true`
        console.log(query)

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
        console.log('QWETAESGJOUHAD;LBJNA;SLDKBN')
        console.log(projectName)

        let query = `UPDATE projects SET complete = true WHERE name = '${projectName}'`
        console.log(query)

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
        console.log("TRYING TO REMOVE &^%#$&^$#&%$#")
        console.log(associate, project)

        let query = `DELETE FROM project_assignment WHERE associate_id = ${associate} AND project_name = '${project}'`
         console.log(query)

          dbPoolInstance.query(query,(err,result)=>{
            callback("Guess the associate burned out")
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
        showDescription
    }
}