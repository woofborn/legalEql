module.exports = (dbPoolInstance) => {

    let verifyLogin = (request,callback)=>{

        let user = request.body.username
        let pw = request.body.password
        console.log(request.body)

        let query = `SELECT * FROM partners WHERE username = '${user}' AND password = '${pw}'`;
        console.log(query)

        dbPoolInstance.query(query,(err,result)=>{

            if (result.rows.length>0){
                console.log(result.rows[0])
                callback(null,result.rows[0])
            } else {
                callback(null,null);
            };
        });
    }

    let newProject = (request,callback)=>{
        console.log(request.body)

        let project = request.body.name
        let upper = project.charAt(0).toUpperCase()+project.substring(1);

        let query = `INSERT INTO projects (name) VALUES ('${upper}') RETURNING *`;
        console.log(query)

        dbPoolInstance.query(query,(err,result)=>{
            console.log('new project insertion' + result.rows[0].id, result.rows[0].name, result.rows[0])
            callback(result.rows[0])
        })
    }

    let associates = (request,callback)=>{
        let query = `SELECT * FROM associates`;
        console.log(query)

        dbPoolInstance.query(query,(err,result)=>{
            console.log('associates:' + result.rows)
            callback(result.rows)
        })
    }

    let addTeam = (request,callback)=>{

        let project = request.body.project_associateid[0]
        let partner = request.cookies.id;
        let associate = request.body.project_associateid[1]

        let query = `INSERT INTO project_assignment (partner_id, associate_id, project_name) VALUES (${partner}, ${associate},'${project}') RETURNING *`
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


    return{
        verifyLogin,
        newProject,
        associates,
        addTeam,
        allTeam
    }
}