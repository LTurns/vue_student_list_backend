const express = require('express'); 
const studentRoute = express.Router(); 

let StudentModel = require('../models/Student'); 
// const { nextTick } = require('vue/types/node');

studentRoute.route('/').get((req, res) => {
    StudentModel.find((error, data) => {
        if(error){
            return next(error)
        } else {
            res.json(data)
        }
    })
})

studentRoute.route('/create-student').post((req, res, next) => {
    StudentModel.create(req.body, (error, data) => {
        if(error){
            return next(error)
        } else {
            res.json(data)
        }
    })
})

studentRoute.route('/edit-student/:id').get((req, res) => {
    StudentModel.findById(req.params.id, (error, data) => {
        if(error){
            return next(error)
        } else {
            res.json(data)
        }
    })
})

studentRoute.route('/update-student/:id').post((req, res, next) => {
    // the posts have the next key word - but not the gets. - Look into this, 
    // perhaps it is because it is editing the database.
    StudentModel.findByIdAndUpdate(req.params.id, {
        $set: req.body
    },  (error, data) => {
        if(error){
            return next(error);
        } else {
            res.json(data)
            console.log("Student successfully updated!")
        }
    })
})

studentRoute.route('/delete-student/:id').delete((req, res, next) => {
    StudentModel.findByIdAndRemove(req.params.id, (error, data) => {
        if(error){
            return next(error)
        } else {
            res.status(200).json({
                msg: data
            })
        }
    })
})

module.exports = studentRoute;