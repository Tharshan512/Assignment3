var express = require('express');
var router = express.Router();
let mongoose = require('mongoose');
// telling my router that I have this model
let Assignment = require('../model/assignment.js');
//const assignment = require('../model/assignment.js');
//let assignmentController = require('../controllers/assignment.js')
/* Get route for the assignment list - Read Operation */
/*
GET,
Post,
Put --> Edit/Update
*/
/* Read Operation --> Get route for displaying the assignments list */
router.get('/', async (req, res, next) => {
    try {
        const AssignmentList = await Assignment.find();
        res.render('Assignment/list', {
            title: 'Assignments',
            AssignmentList:AssignmentList,
        });
    } catch (err) {
        console.error(err);
        res.render('Assignment/list', {
            error: 'Error fetching assignments from the server',
        });
    }
});

/* Create Operation --> Get route for displaying the Add Page */
router.get('/add',async(req,res,next)=>{
    try{
        res.render('Assignment/add',{
            title: 'Add Assignment'
        })
    }
    catch(err)
    {
        console.error(err);
        res.render('Assignment/list',{
            error:'Error on the server'
        })
    }
});

/* Create Operation --> Post route for processing the Add Page */
router.post('/add', async (req, res) => {
    try {
        let newAssignment = Assignment({
            "Name": req.body.Name,
            "Teacher": req.body.Teacher,
            "Subject": req.body.Subject,
            "Description": req.body.Description,
            "Due": req.body.Due,
        });

        Assignment.create(newAssignment);
        res.redirect('/assignmentslist');
    } catch (err) {
        console.error(err);
        res.render('Assignment/add', {
            title: 'Add Assignment',
            error: 'Error creating assignment',
        });
    }
});

/* Update Operation --> Get route for displaying the Edit Page */
router.get('/edit/:id', async (req, res, next) => {
    try {
        const id = req.params.id;
        const assignmentToEdit = await Assignment.findById(id);

        if (!assignmentToEdit) {
            return res.status(404).render('error', { message: 'Assignment not found' });
        }

        res.render('Assignment/edit', {
            title: 'Edit Assignment',
            assignment: assignmentToEdit,
        });
    } catch (err) {
        console.error(err);
        next(err);
    }
});

/* Update Operation --> Post route for processing the Edit Page */
router.post('/edit/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const updatedAssignment = {
            "Name": req.body.Name,
            "Teacher": req.body.Teacher,
            "Subject": req.body.Subject,
            "Description": req.body.Description,
            "Due": req.body.Due,
        };

        await Assignment.findByIdAndUpdate(id, updatedAssignment, { new: true });
        res.redirect('/assignmentslist');
    } catch (err) {
        console.error(err);
        res.render('Assignment/edit', {
            title: 'Edit Assignment',
            error: 'Error updating assignment',
        });
    }
});

/* Delete Operation --> Get route to perform Delete Operation */
router.get('/delete/:id', async (req, res) => {
    try {
        const id = req.params.id;
        await Assignment.findByIdAndDelete(id);
        res.redirect('/assignmentslist');
    } catch (err) {
        console.error(err);
        res.render('Assignment/list', {
            error: 'Error deleting assignment',
        });
    }
});

module.exports = router;