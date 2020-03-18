const moment = require('moment');
const logger = require('../util/logger.js')

var sql = require("mssql");
// config for your database
var config = {
    user: 'sa',
    password: 'P@d0rU123',
    server: '167.71.200.91',
    database: 'BigDB'
};

var err = sql.connect(config)
if (err) console.log(err);

class student{

    async CreateID(req){
        let FunctionName = '[CreateID]'
        return new Promise(async function (resolve,reject) {
            try {
                var cerrent = moment().format();
                var request = new sql.Request();    //เรียกใช้ sqlcommand
                var command = `INSERT INTO Student_Profile
                ( First_Name, Last_Name, Faculty_Id, Gender, Dmission_Date, Grade, Student_Status, Create_By, Create_Date, Update_By,Update_Date,Work_Status) 
                 VALUES('${req.First_Name}','${req.Last_Name}','${req.Faculty_Id}','${req.Gender}','${cerrent}',
                 NULL,'${req.Student_Status}','${req.Create_By}','${cerrent}','${req.Update_By}','${cerrent}','${req.Work_Status}');`
                var result =  await request.query(command); //นำเข้าข้อมูลใส่ db
                let massage = {
                    statusCode: 201,
                    status: `create success`,
            }
            logger.info(massage.status)
            resolve(massage)
            }catch (error) {
                let messageError = {
                    statusCode: error.statusCode || 400,
                    message: error.message || `${FunctionName} CREATE failed [Error] ${error}`
                }
                logger.error(messageError.message)
                reject(messageError)
            }
        })
    }
    async getID(req){
        let FunctionName = '[getID]'
        return new Promise( async function (resolve,reject){
            try{
                var error;
                var request = new sql.Request();
                var commandget = `SELECT * FROM Student_Profile where ID = ${req.ID}`   //หาข้อมูลโดยใช้ id
                var data = await request.query(commandget);
                if (data.recordset.length == 0) {   // ถ้าไม่มีข้อมูลอะไรกลับมา
                    logger.error("getID Header : cannot find document");
                    error = {
                        status_code: "404",
                        status: "Not Found",
                        message: "ไม่พบเอกสารนี้" //404
                    }
                    reject(error);
                } else { // return document ที่ query มา
                    logger.info("getID Header : query document success")
                    let massage = {
                        statusCode: 200,
                        status: `get success`,
                        data : data.recordset
                    }
                    reject(massage); //200
                }
            }catch (error) {
                let messageError = {
                    statusCode: error.statusCode || 400,
                    massage: error.massage || `${FunctionName} CREATE failed [Error] ${error}`
                }
                logger.error(messageError.message)
            }
        })


    }
    async getFaculty(req){
        let FunctionName = '[getFaculty]'
        return new Promise( async function (resolve,reject){
            try{
                var error;
                var request = new sql.Request();
                var commandget = `SELECT * FROM Student_Profile where Faculty_Id = ${req.Faculty_Id} and Student_Status = 'W'`
                console.log(req.Faculty_Id)
                var data = await request.query(commandget);
                console.log(data)
                if (data.recordset.length == 0) {
                    logger.error("getPO Header : cannot find document");
                    error = {
                        status_code: "404",
                        status: "Not Found",
                        message: "ไม่พบเอกสารนี้" //404
                    }
                    reject(error)
                } else { // return document ที่ query มา
                    logger.info("getPO Header : query document success")
                    let massage = {
                        statusCode: 200,
                        status: `get success`,
                        data : data.recordset
                    }
                    resolve(massage)
                }

            }catch (error) {
                let messageError = {
                    statusCode: error.statusCode || 400,
                    massage: error.massage || `${FunctionName} failed [Error] ${error}`
                }
                logger.error(messageError.message)
                reject(messageError)
            }

        })
    }

    async UpdateGread(req){
        let FunctionName = '[UpdateGread]'
        return new Promise( async function (resolve,reject){
        try{
            var error;
            var request = new sql.Request();
            var CommandUpdate = `UPDATE Student_Profile SET Grade = ${req.Grade} WHERE id = ${req.ID};` //update database
            var data = await request.query(CommandUpdate);
            console.log(data)
            let massage = {
                statusCode: 200,
                status: `update success`,
            }
            resolve(massage)
        }catch (error) {
            let messageError = {
                statusCode: error.statusCode || 400,
                massage: error.massage || `${FunctionName} failed [Error] ${error}`
            }
            logger.error(messageError.message)
            reject(messageError)
        }

        })
    }

    async delete(req){
        let FunctionName = '[UpdateWorkstatus]'
        return new Promise( async function (resolve,reject){
            try{
                var error;
                var request = new sql.Request();
                var CommandUpdate = `UPDATE Student_Profile SET Work_Status = 'N' WHERE id = ${req.ID};`
                var data = await request.query(CommandUpdate);
                let massage = {
                    statusCode: 200,
                    status: `delete success`,
                }
                resolve(massage)
            }catch (error) {
                let messageError = {
                    statusCode: error.statusCode || 400,
                    massage: error.massage || `${FunctionName} failed [Error] ${error}`
                }
                logger.error(messageError.message)
                reject(messageError)
            }

        })
    }




}




module.exports = student