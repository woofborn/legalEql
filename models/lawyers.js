module.exports = (dbPoolInstance) => {


    let newProject = (request,callback)=>{
        console.log(request.body)

        let project = request.body.name
        let partnerId = request.cookies.id
        let upper = project.charAt(0).toUpperCase()+project.substring(1);


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

                let query = `INSERT INTO projects (name,partner_id) VALUES ('${upper}',${partnerId}) RETURNING *`;

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

        let query = `SELECT associates.aname, partners.pname FROM project_assignment INNER JOIN associates ON (associates.id = project_assignment.associate_id) INNER JOIN projects ON (projects.name = project_assignment.project_name) INNER JOIN partners ON (partners.id = projects.partner_id) WHERE project_name = '${project}'`
        console.log(query)

        dbPoolInstance.query(query,(err,result)=>{
            console.log(result.rows);
            callback(result.rows)
        })
    }

    let allProjects = (request,callback)=>{
        let partnerId = request.cookies.id

        // let query = `SELECT DISTINCT project_name FROM project_assignment WHERE partner_id = ${partnerId}`
        // let query = `SELECT DISTINCT projects.name FROM projects INNER JOIN project_assignment ON (projects.name = project_assignment.project_name) WHERE projects.complete = false`

        let query = `SELECT name FROM projects  WHERE partner_id = ${partnerId} AND complete = false`
        console.log(query)

        dbPoolInstance.query(query,(err,result)=>{
            callback(result.rows)
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


    return{
        newProject,
        associates,
        addTeam,
        nameAssociate,
        allTeam,
        allProjects,
        complete
    }
}