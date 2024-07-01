const express = require('express');
const app = express();
const db = require('./db/connection');
const bodyParser = require('body-parser');

const PORT = 3000;

app.listen(PORT, function(){
    console.log(`Server running! PORT:${PORT}`)
});

//body parser
app.use(bodyParser.urlencoded({extended: false}));

//db connection
db.authenticate().then(()=>{
    console.log("BD connection OK!")
}).catch(err => {
    console.log("Error BD!", err)
});

//routes
app.get("/", (req, res) => {
    res.send("It's working!");
})

//jobs routes
app.use('/jobs', require('./routes/jobs'));