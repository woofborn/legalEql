module.exports = (dbPoolInstance) => {


    let newProject = (request,callback)=>{
        console.log(request.body)

        let project = request.body.name
        let upper = project.charAt(0).toUpperCase()+project.substring(1);

       let query = `SELECT * FROM projects WHERE name = '${project}'`
       console.log(query)

        dbPoolInstance.query(query,(err,result)=>{

            if (result.rows[0] != undefined && result.rows[0].name === project){
                 // response.send("Be more creative - that one's been taken.")
                 callback(null)
            } else {

                let query = `INSERT INTO projects (name) VALUES ('${upper}') RETURNING *`;

                    dbPoolInstance.query(query,(err,result)=>{

                    console.log (result.rows[0])
                    callback(result.rows[0])
                })
            }
        })
    }


    let associates = (request,callback)=>{

          // let query = `select associate_id,count(associate_id) from project_assignment group by associate_id`;

        // let query = `SELECT associates.id, associates.aname,associates.area,associates.location FROM associates LEFT JOIN (SELECT associate_id,count(associate_id)  FROM project_assignment GROUP BY associate_id) AS count ON (count.associate_id = associates.id) WHERE count<3`;

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
                let query = `INSERT INTO project_assignment (partner_id, associate_id, project_name) VALUES (${partner}, ${associate},'${project}') RETURNING *`
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
        // let project = request.params.name;
        console.log(project)

        let query = `SELECT associates.aname, partners.pname FROM project_assignment INNER JOIN associates ON (associates.id = project_assignment.associate_id) INNER JOIN partners ON (partners.id = project_assignment.partner_id) WHERE project_name = '${project}'`
        console.log(query)

        dbPoolInstance.query(query,(err,result)=>{
            console.log(result.rows);
            callback(result.rows)
        })
    }

    let allProjects = (request,callback)=>{
        let partnerId = request.cookies.id

        let query = `SELECT DISTINCT project_name FROM project_assignment WHERE partner_id = ${partnerId}`

        dbPoolInstance.query(query,(err,result)=>{
            callback(result.rows)
        })

    }


    return{

        newProject,
        associates,
        addTeam,
        nameAssociate,
        allTeam,
        allProjects
    }
}