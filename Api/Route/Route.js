const expres = require('express');
const routes = expres.Router();
const {checkTcken} = require("../Autharize/auth.middleware");

const {signupValidation,LoginValidation,changePassValidator} =require("../../Services/Validation/AuthValidator");
const {EnqueryValidator} = require("../../Services/Validation/Common.Validation");

const {SignUp,Login,ChangePassword} = require("../Controller/Register.Controller");
const {EnqueryList,AddEnquery,GetEnqueryByID,DeleteEnquery,PaginationListing} =require("../Controller/Enquery.Controller");

// ==================Authentication API's=========================
routes.post('/register',signupValidation,SignUp);
routes.post('/login',LoginValidation,Login);
routes.post('/change_password',changePassValidator,ChangePassword);

// ================Enquery Rest API's====================

routes.get('/enquiries',checkTcken,EnqueryList);
routes.post('/enquiries',checkTcken,EnqueryValidator,AddEnquery);
routes.get('/enquiries/:id',checkTcken,GetEnqueryByID);
routes.delete('/enquiries/:id',checkTcken,DeleteEnquery);

routes.get('/enquiries_paginationList',checkTcken,PaginationListing);
routes.get('/enquiries_random',RandomEnqueryGet);

module.exports=routes; 


