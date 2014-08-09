'use strict';

var Mongo = require('mongodb');

function Transaction(obj){
  this.type       = obj.type;
  this.date       = new Date(obj.date);
  this.fee        = parseFloat(obj.fee);
  this.accountId  = Mongo.ObjectID(obj.accountId);
  this.amount     = parseFloat(obj.amount);
}

Object.defineProperty(Transaction, 'collection',{
  get: function(){
    return global.mongodb.collection('transactions');
  }
});

Transaction.create = function(obj, cb){
  var transaction = new Transaction(obj);

  Transaction.collection.save(transaction, function(){
    cb(transaction);
  });
};

Transaction.findByAccountId = function(accountId, cb){
  Transaction.collection.find({
    accountId: Mongo.ObjectID(accountId)
  }).toArray(cb);
};

module.exports = Transaction;
