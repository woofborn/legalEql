module.exports = (dbPoolInstance) => {

    let verifyLogin = (request,callback)=>{

        let user = request.body.username
        let pw = request.body.password
        console.log(request.body)

        let query = `SELECT * FROM lawyers WHERE username = '${user}' AND password = '${pw}'`;
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

    return{
        verifyLogin,
        newProject
    }
}