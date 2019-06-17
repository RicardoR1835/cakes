var mongoose = require('mongoose');

//Below is example create a schema

var ReviewSchema = new mongoose.Schema({
    comment: { type: String, required: 'Name must be longer than 7 characters', trim: true, minlength: 7},
    review: { type: Number, required: 'Please give 1-5 stars'}
}, { timestamps: true });

var CakeSchema = new mongoose.Schema({
    name: { type: String, required: 'Name must be longer than 2 characters', trim: true, minlength: 2},
    url: { type: String, required: 'Must upload a picture', trim: true, minlength: 10 },
    reviews: [ReviewSchema]
}, { timestamps: true });

mongoose.model('Cake', CakeSchema); 
mongoose.model('Review', ReviewSchema);
