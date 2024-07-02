const express = require('express');
const router = express.Router();
const Job = require('../models/Job');

// add job post
router.post('/add', (req, res)=>{
    let {title, salary, company, description, email, new_job} = req.body;

    //insert job BD
    Job.create({
        title,
        salary,
        company,
        description,
        email, 
        new_job
    })
    .then(() => res.redirect('/'))
    .catch( (err) => console.log("ERROR: " + err));
});

router.get('/add', (req, res)=>{
    res.render('add');
})

module.exports = router;
