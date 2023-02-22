const date = require('date-and-time');
require("dotenv").config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mongoose = require("mongoose");
const { validationResult } = require('express-validator');

const User = require("../Model/User.Model");
exports.SignUp = async (req, res, next) => {
   try {
      let validationError = validationResult(req);
      if (validationError.errors.length > 0) {
         return res.status(409).json({
            status: 400,
            data: validationError.errors.map((errorData) => {
               return {
                  'input': errorData.param,
                  'ErrorMsg': errorData.msg
               }
            }),
            message: 'Please provide the valid data.'
         });
      }
      else {
         const { username, email, password, mobile } = req.body;
         // check user is already exist or not 
         const CheckEmail = await User.find({ email: email });
         if (CheckEmail.length > 0) {
            return res.status(409).json({
               status: 409,
               message: "Email already exist try another.",
               email: email
            });
         }
         // cretae hash password
         const passwordHash = bcrypt.hashSync(password, 10);
         //create user
         const user = new User({
            _id: new mongoose.Types.ObjectId(),
            username: username,
            email: email,
            password: passwordHash,
            mobile: mobile
         });
         const InsertRes = await user.save();
         // console.log(InsertRes);
         if (InsertRes) {
            res.status(201).json({
               status: 201,
               message: "User register successfully.",
               id: InsertRes._id,
            });
         }
         else {
            return res.status(404).json({
               status: 404,
               message: "User could not register.",
               id: InsertRes._id,
            });
         }
      }
   }
   catch (err) {
      return res.status(500).json({
         status: 500,
         message: 'Internal server Error.',
         Error: err
      });
   }
}


exports.Login = async (req, res, next) => {
   try {
      let validationError = validationResult(req);
      if (validationError?.errors?.length > 0) {
         return res.status(409).json({
            status: 400,
            data: validationError.errors.map((errorData) => {
               return {
                  'input': errorData.param,
                  'ErrorMsg': errorData.msg
               }
            }),
            message: 'Please provide the valid data.'
         });
      } else {
         // login here 
         const { password, email } = req.body;
         const CheckExistance = await User.find({ email: email });
         // console.log(CheckExistance);
         if (CheckExistance.length > 0) {
            // check password matching
            delete CheckExistance[0]?.password;
            const verified = bcrypt.compareSync(password, CheckExistance[0]?.password);
            if (verified == true) {
               const token = jwt.sign({
                  id: CheckExistance[0]?._id,
                  email: CheckExistance[0]?.email,
               }, process.env.SECRET_STRING_KEY, { expiresIn: '1h' });
               //   console.log(token);
               return res.status(200).json({
                  status: 200,
                  message: 'LoggedIn Successfully !.',
                  data: {
                     id: CheckExistance[0]?._id,
                     email: CheckExistance[0]?.email,
                     username: CheckExistance[0]?.username,
                     mobile: CheckExistance[0]?.mobile,
                  },
                  token: token

               });
            } else {
               return res.status(401).json({
                  status: 401,
                  message: "Invalid password.",
                  email: email
               });
            }
         } else {
            return res.status(401).json({
               status: 401,
               message: "Invalid Email.",
               email: email
            });
         }
      }
   }
   catch (err) {
      // console.log(err);
      return res.status(500).json({
         status: 500,
         message: 'Internal server Error.',
         Error: err
      });
   }
}



exports.ChangePassword = async (req, res, next) => {
   try {
      const validationErr = validationResult(req);
      if (validationErr?.errors?.length > 0) {
         return res.status(409).json({
            status: 400,
            data: validationErr.errors.map((errorData) => {
               return {
                  'input': errorData.param,
                  'ErrorMsg': errorData.msg
               }
            }),
            message: 'Please provide the valid data.'
         });
      }
      else {
         let { id, old_password, password } = req.body;
         let checkUser = await User.find({ _id: id });
         if (checkUser?.length > 0) {
            let ComparePass = bcrypt.compareSync(old_password, checkUser[0]?.password);
            // 422 status code for invalid data or unprocess data
            if (ComparePass == false) {
               return res.status(422).json({
                  status: 422,
                  message: 'old password is mismatch.',
                  data: []
               });
            }
            // if password is match than 
            let BytPass = bcrypt.hashSync(password, 10);
            let UpdateRes = await User.updateOne({ _id: id }, { password: BytPass });
            //  console.log(UpdateRes);
            if (UpdateRes.acknowledged == true && UpdateRes.modifiedCount == 1) {
               return res.status(200).json({
                  status: 200,
                  message: 'Your password updated successfully.',
                  id: id
               });
            } else {
               return res.status(200).json({
                  status: 400,
                  message: 'Your password could not updated.',
                  id: id
               });
            }
         } else {
            return res.status(404).json({ status: 404, message: 'User does not exist.', data: [] });

         }
      }
   } catch (err) {
      return res.status(500).json({
         status: 500,
         message: 'Internal server Error.',
         Error: err
      });
   }



}