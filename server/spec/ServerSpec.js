var request = require('request');
var expect = require('../../node_modules/chai/chai').expect;
var server = require('../server');
var stubs = require('./Stubs');
var db = require('../mysql/config');
var User = require('../mysql/collections/users');


describe('server', function() {
  it('should response to GET requests for /auth/facebook with a 200 status code', function(done){
    request('http://localhost:8100/auth/facebook/callback', function(error, response, body){
      expect(response.statusCode).to.equal(200);
      done();
    });
  });

  it('should response to GET requests for /tab/homepage with a 200 status code', function(done){
    request('http://localhost:8100/tab/homepage', function(error, response, body){
      expect(response.statusCode).to.equal(200);
      done();
    });
  });

  it('should response to GET requests for /auth/tasks with a 200 status code', function(done){
    request('http://localhost:8100/auth/tasks', function(error, response, body){
      expect(response.statusCode).to.equal(200);
      done();
    });
  });

  it('Should 404 when asked for a nonexistent file', function(done) {
      request('http://localhost:8100/nonexistent', function(error, response, body) {
          expect(response.statusCode).to.equal(404);
          done();
      });
    });

  it('Should send back an Array of friends Object', function(done){
    request('http://localhost:8100/auth/friends', function(error, response, body){
      expect();
    });
  });
});

describe('Routing', function () {
  var $scope, $state;
  beforeEach(module('crptFit'));

  beforeEach(inject(function($injector){
    $state = $injector.get('$state');
    $scope = $injector.get('$rootScope').$new();
  }));

  it('Should have /login state, template, and no controller', function() {
    expect($state.state['/login']).to.be.ok();
    expect($state.state['/login'].controller).to.be(undefined);
    expect($state.state['/login'].templateUrl).to.be('templates/login-tab.html');
  });

  it('Should have /profile state, template, and controller', function(){
    expect($state.state['/profile']).to.be.ok();
    expect($state.state['/profile'].controller).to.be('ProfileCtrl');
    expect($state.state['/profile'].templateUrl).to.be('templates/profile-tab.html');
  });

  it('Should have /viewuser state, template, and controller', function(){
    expect($state.state['/viewuser']).to.be.ok();
    expect($state.state['/viewuser'].controller).to.be(undefined);
    expect($state.state['/viewuser'].templateUrl).to.be('templates/profile-view.html');
  });
});


describe('chats', function(){
    var db;
  beforeEach(function(done) {
    db = mysql.createConnection({
      user: "root",
      password: "",
      database: "chats"
    });
    db.connect();
    var tablename = "messages";
    db.query("truncate " + tablename, done);
  });

    afterEach(function() {
      db.end();
    });
    it('should create a new chat table with two user relations in the database', function(done){
      var qs = "INSERT INTO Chats (id, user_id, user2_id) VALUES (?, ?, ?)";
      var qa = [10, 1, 2];
      db.query(qs, qa, function(err){
        if(err){throw err;}
        request("http://127.0.0.1:8100/auth/chats/get" + qa[0], function(err, res, body){
          expect(JSON.parse(body)).to.equal(10);
        });
      });
    });
});
