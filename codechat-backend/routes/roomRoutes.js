const express=require("express");
const { createRoom } = require("../controllers/roomController");

const router=express.Router();

router.route('/create-room').post(createRoom)

module.exports=router;