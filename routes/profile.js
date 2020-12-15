var router = require('express').Router();

router.get('/profile', function(req,res){
    res.redirect('/');
});

module.exports = router;