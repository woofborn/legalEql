const sha256 = require('js-sha256');
const SALT = 'lawyers'

module.exports = (dbPoolInstance) => {


    let verifyAssociate = (request,callback)=>{

        let user = request.body.username
        let pw = sha256(request.body.password + SALT)
        console.log(request.body)
        console.log(pw)
        let query = `SELECT * FROM associates WHERE username = '${user}' AND password = '${pw}'`;
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

    let associateProjects = (request,callback)=>{
        let id = request.cookies.id

        let query = `SELECT project_name FROM project_assignment WHERE associate_id = ${id}`

        dbPoolInstance.query(query,(err,result)=>{
             if (result.rows.length>0){
                console.log(result.rows)
                callback(null,result.rows)
            } else {
                callback(null,null);
            };

        })

    }

    let addBillables = (request,callback)=>{

        let project = request.body.project;
        let associate = request.cookies.id;
        let hours = request.body.hours;
        let date = request.body.date;

        let array = [project, associate, hours, date]

        let query = `INSERT INTO billables (project_name, associate_id, hours, updated) VALUES ($1, $2, $3, $4) RETURNING *`
        console.log(query)

        dbPoolInstance.query(query,array,(err,result)=>{
            callback(null,result.rows[0])
        })

    }


    return{
        verifyAssociate,
        associateProjects,
        addBillables
    }
}