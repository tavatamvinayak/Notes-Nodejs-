const express = require('express');
const app = express();

// // db connect
const dbconnect = require('./db')
dbconnect();


app.use(express.json())
app.use(express.urlencoded({ extended: false }));


// // routes
app.use('/signup', require('./routes/signup'))
app.use('/login', require('./routes/login'))


// /// // CURD 
app.use('/notes',require('./CRUD/CreateNote'));  // // post     //  create Notes
app.use('/notes',require('./CRUD/ReadNote'));    // // get      //  read notes
app.use('/notes',require('./CRUD/UpdateNote'));  // // put      //  update notes
app.use('/notes',require('./CRUD/DeleteNote'));  // // delete   //  delete notes




app.listen(8080,()=>{
    console.log("8080")
})