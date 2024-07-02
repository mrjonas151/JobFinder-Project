const express = require('express');
const {engine} = require('express-handlebars');
const path = require('path')
const app = express();
const db = require('./db/connection');
const bodyParser = require('body-parser');
const Job = require('./models/Job');

const PORT = 3000;

app.listen(PORT, function(){
    console.log(`Server running! PORT:${PORT}`)
});

//body parser, but i prefer using express.json()
//app.use(bodyParser.urlencoded({extended: false}));

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
    Job.findAll({order: [
        ['createdAt', 'DESC']
    ]})
    .then(jobs => {
        res.render("index", {
            jobs
        });
    });
});

//jobs routes
app.use('/jobs', require('./routes/jobs'));