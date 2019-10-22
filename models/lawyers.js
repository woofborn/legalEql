module.exports = (dbPoolInstance) => {

    let verifyLogin = (request,callback)=>{

        let user = request.body.username
        let pw = request.body.password


        let query = `SELECT * FROM lawyers WHERE username = '${user}' AND password = '${pw}'`;
        console.log(query)

        dbPoolInstance.query(query,(err,result)=>{
            console.log(result.rows)

            if (result.rows.length>0){
                callback(null,result.rows[0])
            } else {
                callback(null,null);
            };
        });
    }

    return{
        verifyLogin,
    }
}