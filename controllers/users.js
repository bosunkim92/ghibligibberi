const User = require('../models/user');

module.exports = {
    index
}

function index(req, res, next) {
    console.log(req.query)
    console.log(req.user)
    // let modelQuery = req.query.name? {name: new RegExp(req.query.name, 'i')} : {};
    // let sortKey = req.query.sort || 'name';
    res.render('/index');
}
