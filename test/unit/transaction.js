/* jshint expr:true */
/* global describe, it, before, beforeEach */

'use strict';

var expect    = require('chai').expect;
var Transaction  = require('../../app/models/transaction');
var dbConnect = require('../../app/lib/mongodb');
var cp        = require('child_process');
var db        = 'bankr-test';
var Mongo     = require('mongodb');

describe('Transaction', function(){
  before(function(done){
    dbConnect(db, function(){
      done();
    });
  });

  beforeEach(function(done){
    cp.execFile(__dirname + '/../scripts/freshdb.sh', [db], {cwd:__dirname + '/../scripts'}, function(err, stdout, stderr){
      console.log(stdout, stderr);
      done();
    });
  });

  describe('constructor', function(){
    it('should create a new transaction', function(){
      var obj = {type:'savings', date: '2014-8-8', fee: '0', 
        AccountId: Mongo.ObjectID().toString(), amount: '100'};
      var t = new Transaction(obj);

      expect(t).to.be.instanceof(Transaction);
      expect(t).to.be.okay;
      expect(t.type).to.equal('savings');
      expect(t.date).to.be.instanceof(Date);
      expect(t.fee).to.equal(0);
      expect(t.amount).to.equal(100.00);
      expect(t.accountId).to.be.instanceof(Mongo.ObjectID);
    });
  });
  describe('.create', function(){
    it('should create a new transaction and save it to the database', function(done){
      var obj = {type:'savings', date: '2014-8-8', fee: '0', 
        accountId: Mongo.ObjectID().toString(), amount: '100'};

      Transaction.create(obj, function(transaction){
        expect(transaction).to.be.instanceof(Transaction);
        expect(transaction._id).to.be.instanceof(Mongo.ObjectID);
        done();
      });
    });
  });
  describe('.findByAccountId', function(){
    it('should find transactions by the AccountId', function(done){
      var accountId = '53e5659ee1eb2778810b9d4a';
      Transaction.findByAccountId(accountId, function(err, transactions){
        expect(transactions).to.have.length.gt(0); //gt means > 0
        done();
      });
    });
  });
});
