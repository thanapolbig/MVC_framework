const express = require('express')
const app = express()
const student = require('./controller/logic');
const bodyParser = require('body-parser');
const logger = require('./util/logger.js')



//สร้างรหัส นศ
app.post(`/CreateID`, async (req,res)=>{
    try{
        var result = await new student().CreateID(req.body)
        res.status(201)
        res.json(result)
        console.log(result)
    }catch (error) {
        let messageError = {
            statusCode: error.statusCode || 400,
            message: error.message || error
        }
        res.status(messageError.statusCode)
        res.json(messageError)
        console.log(messageError)
    }
});
//เอารหัส นศ ไปหาข้อมฒุล
app.post(`/getID`, async (req,res)=>{
    try{
        var result = await new student().getID(req.body)
        res.status(200)
        res.json(result)
        console.log(result)
    }catch (error) {
        let messageError = {
            statusCode: error.statusCode || 400,
            message: error.message || error
        }
        res.status(messageError.statusCode)
        res.json(messageError)
        console.log(messageError)
    }
});
//เอารหัสคณะไปหาโดย นศ ต้องยังศึกษาอยู่
app.post(`/getFaculty`, async (req,res)=>{
    try{
        var result = await new student().getFaculty(req.body)
        res.status(200)
        res.json(result)
        console.log(result)
    }catch (error) {
        let messageError = {
            statusCode: error.statusCode || 400,
            message: error.message || error
        }
        res.status(messageError.statusCode)
        res.json(messageError)
        console.log(messageError)
    }
});

app.post(`/UpdateGread`, async (req,res)=>{
    try{
        var result = await new student().UpdateGread(req.body)
        res.status(200)
        res.json(result)
        console.log(result)
    }catch (error) {
        let messageError = {
            statusCode: error.statusCode || 400,
            message: error.message || error
        }
        res.status(messageError.statusCode)
        res.json(messageError)
        console.log(messageError)
    }
});

app.post(`/delete`, async (req,res)=>{
    try{
        var result = await new student().delete(req.body)
        res.status(200)
        res.json(result)
        console.log(result)
    }catch (error) {
        let messageError = {
            statusCode: error.statusCode || 400,
            message: error.message || error
        }
        res.status(messageError.statusCode)
        res.json(messageError)
        console.log(messageError)
    }
});

module.exports = app