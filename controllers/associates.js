const sha256 = require('js-sha256');
const SALT = 'lawyers'

module.exports = (db) => {


    let loginControllerCallback = (request, response) => {


        response.render('associate_login')
    };

    let verifyControllerCallback = (request,response)=>{

        db.associates.verifyAssociate(request,(err,result)=>{

            if (result != null) {
                response.cookie('name', result.aname)
                response.cookie('id',result.id)
                let id = result.id.toString()
                let hashLogin = sha256(SALT + id)
                response.cookie('loggedin',hashLogin)

                const info = {
                    name: result.aname
                }

                response.redirect('/billables')
            } else {
                const info = {
                    fail: true
                }
                response.render('associate_login',info)
            }
        })
    }

    let apageControllerCallback = (request, response) => {
        console.log('LOGGED IN COOKIES??????????')
        console.log(request.cookies.loggedin)

        if (request.cookies.loggedin === undefined){
                const info ={
                    login: false
                }
                response.render('associate_login', info)

        } else if (request.cookies.loggedin !=undefined){

            let name = request.cookies.name
            let id = request.cookies.id.toString()
            let hashLogin = sha256(SALT + id)


            let cheese = request.cookies.cheese
            console.log("CHEESE" + cheese)

                if(request.cookies.cheese != undefined){
                    response.render('nopartners')

                } else if (request.cookies.loggedin===hashLogin){

                     db.associates.associateProjects(request,(err,result)=>{

                        if (result!=null){

                              db.associates.projectBillable(request,(err,banana)=>{

                                if (banana!=null){
                                 db.associates.totalBillable(request,(err,apple)=>{

                                 let totalBilled = parseInt(apple.sum)
                                 let percentage = Math.floor(totalBilled/1900*100)
                                 console.log(percentage)

                                var info = {
                                projects:result,
                                billables: banana,
                                total: apple,
                                percentage,
                                name,
                                }
                                console.log('ASSOCIATE DATAAAAAA')
                                console.log(info)
                                     response.render('associatepage', info)

                                })
                                } else {
                                info = {
                                // none: true,
                                projects:result,
                                billables: banana,
                                name
                            }
                                 response.render('associatepage', info)
                        }
                            })

                        } else {
                            info = {
                                // none: true,
                                projects:result,
                                name
                            }
                                 response.render('associatepage', info)
                        }

                })
            }

        }

    };


    let billableControllerCallback = (request,response)=>{
        console.log("BILL BABY BILLLLLLLLLLLLL")
        console.log(request.body)


        db.associates.addBillables(request,(err,result)=>{
            let dateString = result.updated.toString()
            console.log(typeof dateString)

            db.associates.billableSummary(request,(err,banana)=>{

                 const data = {
                project: result.project_name,
                hours: result.hours,
                date: dateString,
                billables: banana,
            }
                console.log(data)

            response.render('summary', data)


            })



        })

    }

  return {

    login: loginControllerCallback,
    verify: verifyControllerCallback,
    apage: apageControllerCallback,
    // logout: logoutControllerCallback
    billables: billableControllerCallback
  }
}