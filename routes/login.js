const express = require('express');
const router = express.Router();


// // encrypt
const CryptoJS = require("crypto-js");

/// Jwt
const jwt = require('jsonwebtoken');

// /// Schema
const Users = require('../models/User');


const auth = require('../Middleware/auth');



router.post('/', async (req, res) => {
    const Logins = new Users();
    // request body login
    const { Email, Password } = req.body
    Logins.Email = Email;
    Logins.Password = Password;

    try {
        /// /// Email checks Exist or Not
        const FindEmail = await Users.findOne({ Email: Email })

        // // Exist or Not Email
        if (FindEmail != null) {  // req.body Email

            /// /// decrypt Password
            const decryptedPassword = CryptoJS.AES.decrypt(FindEmail.Password, 'Secret Key VinayakTavatam').toString(CryptoJS.enc.Utf8);

            if (decryptedPassword === Password) {
                console.log("Login success & password is corrected")
            
                // // JWT
                const Token = jwt.sign({ Email: FindEmail.Email, id: FindEmail._id }, 'SecreteKeyVT');
                console.log(Token)
                res.send(Token)


            } else {
                console.log("PassWord invalid")
                res.send('PassWord invalid')
            }

        } else {
            console.log("Email invalid ")
            res.send("Email invalid")
        }

    } catch (error) {
        console.log(error)
        res.send(error)
    }
})


module.exports = router;
