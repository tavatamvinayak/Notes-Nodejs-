const express = require('express');
const router = express.Router();

// // encrypt
const CryptoJS = require("crypto-js");

/// Jwt
const jwt = require('jsonwebtoken');

// /// Schema
const Users = require('../models/User')

router.post('/', async (req, res) => {

    const { Fname, Email, Password } = req.body;

    const SignUp = new Users();
    SignUp.Fname = Fname;
    SignUp.Email = Email;

    try {
        // /// Encrypt password save database  
        //CryptoJS require line :4
        const EncryptPassword = CryptoJS.AES.encrypt(Password, 'Secret Key VinayakTavatam').toString(); // // password encrypt  
        console.log("🚀 ~ file: index.js:32 ~ app.post ~ EncryptPassword:", EncryptPassword)

        SignUp.Password = EncryptPassword;

        // /// Find a Email Already signup Check ( Already exist Or Not)
        const FindEmail = await Users.findOne({ Email: Email })
        console.log(`Find Email ${FindEmail}`)

        if (!FindEmail) {
            const SaveData = await SignUp.save(); // save data in database

            // // JWT
            const Token = jwt.sign({ Email: SaveData.Email, id: SaveData._id }, 'SecreteKeyVT');

            res.json({ user: SaveData, token: Token })
            console.log({ user: SaveData, token: Token })


        } else {
            console.log("this Email is Already Exist")
            res.send("this Email is Already Exist == == Try AnOther Email")
        }


    } catch (error) {
        console.error(error)
        res.send("something wrong")
    }



})

module.exports = router;