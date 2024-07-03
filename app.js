const express = require('express');
const {engine} = require('express-handlebars');
const path = require('path')
const app = express();
const db = require('./db/connection');
const bodyParser = require('body-parser');
const Job = require('./models/Job');
const Sequelize = require('sequelize');
const OP = Sequelize.Op;

const PORT = 3000;

app.listen(PORT, function(){
    console.log(`Server running! PORT:${PORT}`)
});

//body parser, but i prefer using express.json() receiving queries through the add.handlebars
app.use(express.urlencoded({ extended: true }));

//json to receive the informations in json format
app.use(express.json());

//handlebars
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', engine({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

//static folders
app.use(express.static(path.join(__dirname, 'public')));

//db connection
db.authenticate().then(()=>{
    console.log("BD connection OK!")
}).catch(err => {
    console.log("Error BD!", err)
});

//routes
app.get("/", (req, res) => {

    let search = req.query.job;
    let query = '%' + search + '%';

    if(!search){
        Job.findAll({order: [
            ['createdAt', 'DESC']
        ]})
        .then(jobs => {
            res.render("index", {
                jobs
            });
        })
        .catch(err => console.log("ERROR: "+err));
    }else{
        Job.findAll({
            where: {title: {[OP.like]:query}},
            order: [
            ['createdAt', 'DESC']
        ]})
        .then(jobs => {
            res.render("index", {
                jobs, search
            });
        });
    }
});

//jobs routes
app.use('/jobs', require('./routes/jobs'));