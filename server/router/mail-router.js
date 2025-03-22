const express=require("express")

const {sendMail}=require("../controllers/mail/nodemailer")

const router=express.Router();

router.post("/send-mail",sendMail)

module.exports=router;
