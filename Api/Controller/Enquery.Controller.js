require("dotenv").config();
const { validationResult } = require("express-validator");
const mongoose = require("mongoose");
const Enquery = require("../Model/Enquery.Model");
// pincode from "pincode-distance"

exports.EnqueryList = async (req, res, next) => {
    try {
        let EnqueryRes = await Enquery.find().sort({ _id: -1 });
        if (EnqueryRes?.length > 0) {
            return res.status(200).json({
                status: 200,
                count: EnqueryRes?.length,
                data: EnqueryRes.map((data) => {
                    return {
                        id: data?._id,
                        GuestName: data?.GuestName,
                        Email: data?.Email,
                        Phone: data?.Phone,
                        Message: data?.Message,
                        Country: data?.Country,
                        State: data?.State,
                        Zipcode: data?.Zipcode
                    }
                }),
                message: 'Enquery list.'
            });

        } else {
            return res.status(200).json({
                status: 200,
                count: 0,
                data: [],
                message: 'Enquery list.'
            });
        }
    }
    catch (error) {
        return res.status(500).json({ status: 500, Error: error, message: 'Internal server Error !.' });

    }
}

exports.AddEnquery = async (req, res, next) => {
    try {
        let validationError = validationResult(req);
        if (validationError?.errors?.length > 0) {
            return res.status(409).json({
                status: 409,
                data: validationError?.errors?.map((data) => {
                    return {
                        'input': data?.param,
                        'ErrorMsg': data?.msg
                    }
                }),
                message: 'Data Validation Error.'
            });
        } else {
            // Add enqueries
            const { GuestName, Email, Phone, Message, Country, State, Zipcode } = req.body;
            // const enquery = new Enquery( {
            //     _id: new mongoose.Types.ObjectId(),
            //     GuestName,Email,Phone,Message,Country,State,Zipcode} );
            // const enquery_res = await enquery.save();
            let obj = {
                _id: new mongoose.Types.ObjectId(),
                GuestName, Email, Phone, Message, Country, State, Zipcode
            };
            const enquery_res = await Enquery.create(obj);
            // console.log(enquery_res);
            if (enquery_res) {
                return res.status(201).json({
                    status: 201,
                    enquery_ID: enquery_res._id,
                    message: 'Enquery created.'
                });
            } else {
                return res.status(404).json({
                    status: 404,
                    message: 'Enquery not created.'
                });
            }
        }
    }
    catch (err) {
        return res.status(500).json({ status: 500, Error: err, message: 'Internal server Error !.' });
    }

}


exports.GetEnqueryByID = async (req, res, next) => {
    try {
        const id = req.params.id;
        console.log(id);
        const GetResponce = await Enquery.find({ _id: id });
        console.log(GetResponce);
        if (GetResponce?.length > 0) {
            return res.status(200).json({
                status: 200,
                count: GetResponce?.length,
                data: GetResponce.map((dat) => {
                    return {
                        id: dat?._id,
                        GuestName: dat?.GuestName,
                        Email: dat?.Email,
                        Phone: dat?.Phone,
                        Message: dat?.Message,
                        Country: dat?.Country,
                        State: dat?.State,
                        Zipcode: dat?.Zipcode
                    }
                }),
                message: `Enquery detail by id: ${id}.`
            });

        } else {
            return res.status(200).json({
                status: 200,
                count: 0,
                data: [],
                message: 'Enquery list.'
            });
        }
    } catch (err) {
        return res.status(500).json({ status: 500, Error: err, message: 'Internal server Error !.' });
    }

}

exports.DeleteEnquery = async (req, res, next) => {
    try {
        const id = req.params.id;
        const ResponseDel = await Enquery.deleteOne({ _id: id });
        // console.log(ResponseDel);
        // console.log(ResponseDel.deletedCount);
        if (ResponseDel?.deletedCount > 0) {
            return res.status(200).json({
                status: 200,
                count: ResponseDel?.deletedCount,
                id: id,
                message: 'Enquery  deleted successfully.'
            });

        } else {
            return res.status(200).json({
                status: 200,
                count: 0,
                id: id,
                message: `Enquery could delete try again(Id couldn't find).`
            });
        }

    }
    catch (err) {
        return res.status(500).json({ status: 500, Error: err, message: 'Internal server Error !.' });
    }

}

exports.PaginationListing = async (req, res, next) => {
    try {
        const { limit, page } = req.query;
        const DataRes = await Enquery.find().limit(limit * 1)
            .skip((page - 1) * limit);
        const count = await Enquery.count();
        if (DataRes?.length > 0) {
            return res.status(200).json({
                status: 200,
                count: DataRes?.length,
                data: DataRes?.map((data) => {
                    return {
                        id: data?._id,
                        GuestName: data?.GuestName,
                        Email: data?.Email,
                        Phone: data?.Phone,
                        Message: data?.Message,
                        Country: data?.Country,
                        State: data?.State,
                        Zipcode: data?.Zipcode
                    }
                }),
                currentPage: parseInt(page),
                totalPages: Math.ceil(count / limit),
                message: 'Enquery list.'
            });
        } else {
            return res.status(200).json({
                status: 200,
                count: 0,
                data: [],
                message: 'Enquery list.'
            });
        }

    } catch (error) {

    }

}


exports.RandomEnqueryGet = async(req,res,next) =>{

    const count = await Enquery.count();
    // console.log(count);
    var random = Math.floor(Math.random() * count);
    const GetRandom = await Enquery.find().limit(1).skip(random);
    //  console.log(GetRandom);
    if(GetRandom?.length >0 ) {
        return res.status(200).json({
            status: 200,
            count: GetRandom?.length,
            data: GetRandom.map((data)=>{
                return{
                    id: data?._id,
                    GuestName: data?.GuestName,
                    Email: data?.Email,
                    Phone: data?.Phone,
                    Message: data?.Message,
                    Country: data?.Country,
                    State: data?.State,
                    Zipcode: data?.Zipcode
                }
            }),
            message: 'Random Enquery list.'
        });

    } else {
        return res.status(200).json({
            status: 200,
            count: 0,
            data: [],
            message: 'Random Enquery list.'
        });
    }


}