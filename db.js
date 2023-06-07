// // env access
require('dotenv').config()


const mongoose = require('mongoose')

const dbConnect = async()=>{
    mongoose.connect( 'mongodb://127.0.0.1:27017/UsersDataSend' || process.env.MONGODB_URL ).then(() => {
        console.log('connected database successfully')
    }).catch((err) => {
        console.error(err)
    });
}
// process.env.MONGODB_URL ||
module.exports = dbConnect;

