const express=require('express');
const router=express.Router();
const Users=require('../models/Users');
const bcrypt=require('bcryptjs');
const {body,validationResult}=require('express-validator');
const jwt=require('jsonwebtoken');
const getuser=require('../middleware/getUser')
const dotenv=require("dotenv")
dotenv.config({path:'../config.env'})
const mysign=process.env.MYSIGN
router.use(express.json());

//Sign up route
router.post('/createuser',[
    body('name','Enter a valid name').isLength({min:3}),
    body('email','Invalid Email address').isEmail(),
    body('username','Invalid username').isLength({min:3}),
    body('password','Password must be of atleast 6 characters').isLength({min:6})
],async(req,res)=>{
    console.log(req.body);
    let success=false;
    const errors=validationResult(req);
    if(!errors.isEmpty){
        return res.status(400).json({success,"Status":"Please try again!"});
    }
    try{
        let user=await Users.findOne({email:req.body.email})
        if(user){
            res.status(400).json({success,"Status":"Email already exists"});
            return;
        }
        let username=await Users.findOne({username:req.body.username})
        if(username){
            res.status(400).json({success,"Status":"Username already exists"});
            return;
        }
        const salt= await bcrypt.genSalt(10);
        // const securedPassword=await bcrypt.hash(req.body.password,salt);
        user=await  Users.create({
            name: req.body.name,
            email: req.body.email,
            username: req.body.username,
            password:req.body.password,
            dp:req.body.dp

        });
        console.log(user, 'line 46');

        const data={
            user:{
              id:user.id
            }
          }
        const token=jwt.sign(data,mysign);
        success=true;
        // res.json({success,token,"Status":"Yay! Welcome to CodeChat"})
         if (user) {
            console.log('user found with these details  ' , user)
            res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            username:user.username,
            isAdmin: user.isAdmin,
            dp: user.dp,
            token,
            });
        } else {
            res.status(400);
            throw new Error("User not found");
        }

    }
    catch(error){
        console.log(error);
        res.status(500).json({"success":false,"Status":"Server Error!"})
    }
})

//Login route

router.post('/login',[
    body('email','Invalid Email address').isEmail(),
    body('password','Password must be of atleast 6 characters').isLength({min:6})],
    async(req,res)=>{
        let success=false;
        const error=validationResult(req);
        if(!error.isEmpty()){
            return res.status(400).json({success,"Status":"Please try again!"})
        }
        try{
            const {email,password}=req.body;
            const user=await Users.findOne({email});
            if(!user){
                res.status(400).json({success,"Status":"Please enter correct email id and password"})
            }
            const comparePassword=await bcrypt.compare(password,user.password);
            if(!comparePassword){
                res.status(400).json({success,"Status":"Please enter correct email id and password"})
            }
            const data={
                user:{
                    id:user.id
                }
            }
            const token=jwt.sign(data,mysign);
            success=true;
            // res.json({success,token,"Status":"Welcome Back "+user.name.toUpperCase()})
                res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                username:user.username,
                isAdmin: user.isAdmin,
                dp: user.dp,
              
                token
                });
        }
        catch(error){
            console.log(error);
            res.status(500).json({"success":false,"Status":"Server Error!"})
        }
    })

// User Details route

router.post('/getuser',getuser,async(req,res)=>{
    try{
    let success=false;
    const userId=req.user.id;
    const user=await Users.findById(userId).select('-password');
    if(!user){
     res.status(404).json({success,"Status":"User Not Found"});
    return;
    }
    success=true;
    res.json({success,user});
    }
    catch(error){
        res.status(500).json({"success":false,"Status":"Server error!"})
    }
})

module.exports=router;