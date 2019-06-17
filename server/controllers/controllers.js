var mongoose = require('mongoose');
require('../models/models.js');

var Cake = mongoose.model('Cake'); //Any name is okay
var Review = mongoose.model('Review');
module.exports = {
        index: function (req, res) {
            Cake.find({}, function (err, cakes) {
                if (err) {
                    console.log("Returned error", err);
                    // respond with JSON
                    res.json({
                        message: "Error",
                        error: err
                    })
                } else {
                    // respond with JSON
                    res.json({
                        message: "Success",
                        data: cakes
                    })
                }
            })
        },
        create: function (req, res) {
            var cake = new Cake();
            cake.name = req.body.name;
            cake.url = req.body.url;
            cake.save(function (err, result) {
                if (err) {
                    console.log("something went wrong", err);
                } else {
                    console.log("successfully updated")
                    res.json({
                        result: result
                    });
                }
            })
        },

        rate: function (req, res) {
            var review = new Review();
            review.comment = req.body.comment;
            review.review = req.body.rate;
            review.save(function (err) {
                if (err) {
                    console.log("Somethings not right", err);
                } else {
                    Cake.findOneAndUpdate({
                        _id: req.params.id
                    }, {
                        $push: {
                            reviews: review
                        }
                    }, function (err) {
                        if (err) {
                            console.log("Issue finding cake", err);
                        } else {
                            console.log("successfully added review");
                        }
                    })
                }
            })
        },

        cake: function(req,res){
                Cake.findOne({_id: req.params.id}, function(err,cake){
                    if(err){
                        console.log("something went wrong", err);
                    } else {
                        console.log("got out cake", cake);
                        res.json({message: "Success", data: cake});
                    }
                })
            },

        rating: function(req,res){
            Cake.aggregate([{
                            $match: {
                                _id: mongoose.Types.ObjectId(req.params.id)
                            }
                        }, {
                            $project: {
                            rateavg: {
                                $avg: "$reviews.review"
                            }}
                        }], function (err, cake) {
                            if (err) {
                                console.log("something went wrong", err);
                            } else {
                                console.log("got our cake aggregation", cake);
                                res.json({message: "Success", data: cake});
                            }
                    })
        }

    }
        // cake: function(req,res){
        //     Cake.findOne({_id: req.params.id}, function(err,cake){
        //         if(err){
        //             console.log("something went wrong", err);
        //         } else {
        //             console.log("got out cake", cake);
        //             res.json({message: "Success", data: cake});
        //         }
        //     })
        // }

        // cake: function (req, res) {
        //     Cake.aggregate([{
        //             $match: {
        //                 _id: req.params.id
        //             }
        //         }, {
        //             $project: {
        //             rateavg: {
        //                 $avg: "$reviews.review"
        //             }}
        //         }], function (err, cake) {
        //             if (err) {
        //                 console.log("something went wrong", err);
        //             } else {
        //                 console.log("got out cake", cake);
        //                 res.json({message: "Success", data: cake});
        //             }
        //     })
        // }