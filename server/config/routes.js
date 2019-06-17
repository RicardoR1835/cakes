var cakes = require('../controllers/controllers');

module.exports = function(app){
    app.get('/cakes', function (req, res) {
        // This is where we will retrieve the users from the database and include them in the view page we will be rendering.
        cakes.index(req, res) ;
    })

    // Below is example of post method
    app.post('/create', function (req, res) {
        cakes.create(req, res);
    })

    app.put('/create/review/:id', function (req,res){
        cakes.rate(req,res);
    }) 

    app.get('/cake/:id', function(req,res){
        cakes.cake(req,res);
    })
    app.get('/rate/:id', function(req,res){
        cakes.rating(req,res);
    })
    
}