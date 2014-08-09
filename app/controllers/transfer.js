/*'use strict';

var Transfer = require('../models/transfer');

exports.create = function(req, res){
  Transfer.create(req.body, function(transfer){
    res.redirect('/accounts/' + req.body.fromAccountId);
  });
};*/
