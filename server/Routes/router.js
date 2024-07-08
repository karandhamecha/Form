const express = require("express");
const router = new express.Router();
const conn = require("../db/conn");


// Register User Data
router.post("/create", async(req,res) => {

 const {Company_Name, Company_Code, Company_Location, Company_Pincode} = req.body;

 if(!Company_Name || !Company_Code || !Company_Location || !Company_Pincode) {
    res.status(422).json("Please fill All data");
 }

    try {
        conn.query("SELECT * FROM users WHERE Company_Name = ?", Company_Name, (err, result) => {
            if(result.length) {
                res.status(422).json("This Company Name is Already Exists");
            } else {
                conn.query("INSERT INTO users SET ?", {Company_Name, Company_Code, Company_Location, Company_Pincode}, (err, result) => {
                    if (err) {
                        console.log("err", err);
                    } else {
                        res.status(201).json(req.body);
                    }
                })
            }
        })
    } catch (error) {
        res.status(422).json(error);
    }

});

// get User Data
router.get("/getusers", (req,res) => {
    conn.query("SELECT * FROM users", (err, result) => {
        if (err) {
            res.status(422).json("No Data Availabel");
        } else {
            res.status(201).json(result);
        }
    })
})


module.exports = router;