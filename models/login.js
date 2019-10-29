const sha256 = require('js-sha256');
const SALT = 'lawyers'

module.exports = (dbPoolInstance) => {

    let verifyLogin = (request,callback)=>{

        let user = request.body.username
        let pw = sha256(request.body.password + SALT)

        let query = `SELECT * FROM partners WHERE username = '${user}' AND password = '${pw}'`;


        dbPoolInstance.query(query,(err,result)=>{

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