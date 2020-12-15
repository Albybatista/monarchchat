const User = require('../models/user');

module.exports = {
  index,
  addFeeling,
  delFeeling
};

function index(req, res, next) {
  console.log(req.query)
  // Make the query object to use with User.find based up
  // the user has submitted the search form or now
  let modelQuery = req.query.name ? {name: new RegExp(req.query.name, 'i')} : {};
  // Default to sorting by name
  let sortKey = req.query.sort || 'name';
  User.find(modelQuery)
  .sort(sortKey).exec(function(err, users) {
    if (err) return next(err);
    // Passing search values, name & sortKey, for use in the EJS
    res.render('users/index', {
        users,
        name: req.query.name,
        sortKey
     });
  });
}

function addFeeling(req, res, next) {
    req.user.facts.push(req.body);
    req.user.save(function(err) {
      res.redirect('/profile');
    });
  }
  
  function delFeeling(req, res, next) {
    Student.findOne({'feelingss._id': req.params.id}, function(err, student) {
      user.facts.id(req.params.id).remove();
      user.save(function(err) {
        res.redirect('/profile');
      });
    });
  }