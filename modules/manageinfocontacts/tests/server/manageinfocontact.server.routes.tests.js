'use strict';

var should = require('should'),
  request = require('supertest'),
  path = require('path'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Manageinfocontact = mongoose.model('Manageinfocontact'),
  express = require(path.resolve('./config/lib/express'));

/**
 * Globals
 */
var app,
  agent,
  credentials,
  user,
  manageinfocontact;

/**
 * Manageinfocontact routes tests
 */
describe('Manageinfocontact CRUD tests', function () {

  before(function (done) {
    // Get application
    app = express.init(mongoose);
    agent = request.agent(app);

    done();
  });

  beforeEach(function (done) {
    // Create user credentials
    credentials = {
      username: 'username',
      password: 'M3@n.jsI$Aw3$0m3'
    };

    // Create a new user
    user = new User({
      firstName: 'Full',
      lastName: 'Name',
      displayName: 'Full Name',
      email: 'test@test.com',
      username: credentials.username,
      password: credentials.password,
      provider: 'local'
    });

    // Save a user to the test db and create new Manageinfocontact
    user.save(function () {
      manageinfocontact = {
        name: 'Manageinfocontact name'
      };

      done();
    });
  });

  it('should be able to save a Manageinfocontact if logged in', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new Manageinfocontact
        agent.post('/api/manageinfocontacts')
          .send(manageinfocontact)
          .expect(200)
          .end(function (manageinfocontactSaveErr, manageinfocontactSaveRes) {
            // Handle Manageinfocontact save error
            if (manageinfocontactSaveErr) {
              return done(manageinfocontactSaveErr);
            }

            // Get a list of Manageinfocontacts
            agent.get('/api/manageinfocontacts')
              .end(function (manageinfocontactsGetErr, manageinfocontactsGetRes) {
                // Handle Manageinfocontacts save error
                if (manageinfocontactsGetErr) {
                  return done(manageinfocontactsGetErr);
                }

                // Get Manageinfocontacts list
                var manageinfocontacts = manageinfocontactsGetRes.body;

                // Set assertions
                (manageinfocontacts[0].user._id).should.equal(userId);
                (manageinfocontacts[0].name).should.match('Manageinfocontact name');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to save an Manageinfocontact if not logged in', function (done) {
    agent.post('/api/manageinfocontacts')
      .send(manageinfocontact)
      .expect(403)
      .end(function (manageinfocontactSaveErr, manageinfocontactSaveRes) {
        // Call the assertion callback
        done(manageinfocontactSaveErr);
      });
  });

  it('should not be able to save an Manageinfocontact if no name is provided', function (done) {
    // Invalidate name field
    manageinfocontact.name = '';

    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new Manageinfocontact
        agent.post('/api/manageinfocontacts')
          .send(manageinfocontact)
          .expect(400)
          .end(function (manageinfocontactSaveErr, manageinfocontactSaveRes) {
            // Set message assertion
            (manageinfocontactSaveRes.body.message).should.match('Please fill Manageinfocontact name');

            // Handle Manageinfocontact save error
            done(manageinfocontactSaveErr);
          });
      });
  });

  it('should be able to update an Manageinfocontact if signed in', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new Manageinfocontact
        agent.post('/api/manageinfocontacts')
          .send(manageinfocontact)
          .expect(200)
          .end(function (manageinfocontactSaveErr, manageinfocontactSaveRes) {
            // Handle Manageinfocontact save error
            if (manageinfocontactSaveErr) {
              return done(manageinfocontactSaveErr);
            }

            // Update Manageinfocontact name
            manageinfocontact.name = 'WHY YOU GOTTA BE SO MEAN?';

            // Update an existing Manageinfocontact
            agent.put('/api/manageinfocontacts/' + manageinfocontactSaveRes.body._id)
              .send(manageinfocontact)
              .expect(200)
              .end(function (manageinfocontactUpdateErr, manageinfocontactUpdateRes) {
                // Handle Manageinfocontact update error
                if (manageinfocontactUpdateErr) {
                  return done(manageinfocontactUpdateErr);
                }

                // Set assertions
                (manageinfocontactUpdateRes.body._id).should.equal(manageinfocontactSaveRes.body._id);
                (manageinfocontactUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should be able to get a list of Manageinfocontacts if not signed in', function (done) {
    // Create new Manageinfocontact model instance
    var manageinfocontactObj = new Manageinfocontact(manageinfocontact);

    // Save the manageinfocontact
    manageinfocontactObj.save(function () {
      // Request Manageinfocontacts
      request(app).get('/api/manageinfocontacts')
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Array).and.have.lengthOf(1);

          // Call the assertion callback
          done();
        });

    });
  });

  it('should be able to get a single Manageinfocontact if not signed in', function (done) {
    // Create new Manageinfocontact model instance
    var manageinfocontactObj = new Manageinfocontact(manageinfocontact);

    // Save the Manageinfocontact
    manageinfocontactObj.save(function () {
      request(app).get('/api/manageinfocontacts/' + manageinfocontactObj._id)
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Object).and.have.property('name', manageinfocontact.name);

          // Call the assertion callback
          done();
        });
    });
  });

  it('should return proper error for single Manageinfocontact with an invalid Id, if not signed in', function (done) {
    // test is not a valid mongoose Id
    request(app).get('/api/manageinfocontacts/test')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'Manageinfocontact is invalid');

        // Call the assertion callback
        done();
      });
  });

  it('should return proper error for single Manageinfocontact which doesnt exist, if not signed in', function (done) {
    // This is a valid mongoose Id but a non-existent Manageinfocontact
    request(app).get('/api/manageinfocontacts/559e9cd815f80b4c256a8f41')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'No Manageinfocontact with that identifier has been found');

        // Call the assertion callback
        done();
      });
  });

  it('should be able to delete an Manageinfocontact if signed in', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new Manageinfocontact
        agent.post('/api/manageinfocontacts')
          .send(manageinfocontact)
          .expect(200)
          .end(function (manageinfocontactSaveErr, manageinfocontactSaveRes) {
            // Handle Manageinfocontact save error
            if (manageinfocontactSaveErr) {
              return done(manageinfocontactSaveErr);
            }

            // Delete an existing Manageinfocontact
            agent.delete('/api/manageinfocontacts/' + manageinfocontactSaveRes.body._id)
              .send(manageinfocontact)
              .expect(200)
              .end(function (manageinfocontactDeleteErr, manageinfocontactDeleteRes) {
                // Handle manageinfocontact error error
                if (manageinfocontactDeleteErr) {
                  return done(manageinfocontactDeleteErr);
                }

                // Set assertions
                (manageinfocontactDeleteRes.body._id).should.equal(manageinfocontactSaveRes.body._id);

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to delete an Manageinfocontact if not signed in', function (done) {
    // Set Manageinfocontact user
    manageinfocontact.user = user;

    // Create new Manageinfocontact model instance
    var manageinfocontactObj = new Manageinfocontact(manageinfocontact);

    // Save the Manageinfocontact
    manageinfocontactObj.save(function () {
      // Try deleting Manageinfocontact
      request(app).delete('/api/manageinfocontacts/' + manageinfocontactObj._id)
        .expect(403)
        .end(function (manageinfocontactDeleteErr, manageinfocontactDeleteRes) {
          // Set message assertion
          (manageinfocontactDeleteRes.body.message).should.match('User is not authorized');

          // Handle Manageinfocontact error error
          done(manageinfocontactDeleteErr);
        });

    });
  });

  it('should be able to get a single Manageinfocontact that has an orphaned user reference', function (done) {
    // Create orphan user creds
    var _creds = {
      username: 'orphan',
      password: 'M3@n.jsI$Aw3$0m3'
    };

    // Create orphan user
    var _orphan = new User({
      firstName: 'Full',
      lastName: 'Name',
      displayName: 'Full Name',
      email: 'orphan@test.com',
      username: _creds.username,
      password: _creds.password,
      provider: 'local'
    });

    _orphan.save(function (err, orphan) {
      // Handle save error
      if (err) {
        return done(err);
      }

      agent.post('/api/auth/signin')
        .send(_creds)
        .expect(200)
        .end(function (signinErr, signinRes) {
          // Handle signin error
          if (signinErr) {
            return done(signinErr);
          }

          // Get the userId
          var orphanId = orphan._id;

          // Save a new Manageinfocontact
          agent.post('/api/manageinfocontacts')
            .send(manageinfocontact)
            .expect(200)
            .end(function (manageinfocontactSaveErr, manageinfocontactSaveRes) {
              // Handle Manageinfocontact save error
              if (manageinfocontactSaveErr) {
                return done(manageinfocontactSaveErr);
              }

              // Set assertions on new Manageinfocontact
              (manageinfocontactSaveRes.body.name).should.equal(manageinfocontact.name);
              should.exist(manageinfocontactSaveRes.body.user);
              should.equal(manageinfocontactSaveRes.body.user._id, orphanId);

              // force the Manageinfocontact to have an orphaned user reference
              orphan.remove(function () {
                // now signin with valid user
                agent.post('/api/auth/signin')
                  .send(credentials)
                  .expect(200)
                  .end(function (err, res) {
                    // Handle signin error
                    if (err) {
                      return done(err);
                    }

                    // Get the Manageinfocontact
                    agent.get('/api/manageinfocontacts/' + manageinfocontactSaveRes.body._id)
                      .expect(200)
                      .end(function (manageinfocontactInfoErr, manageinfocontactInfoRes) {
                        // Handle Manageinfocontact error
                        if (manageinfocontactInfoErr) {
                          return done(manageinfocontactInfoErr);
                        }

                        // Set assertions
                        (manageinfocontactInfoRes.body._id).should.equal(manageinfocontactSaveRes.body._id);
                        (manageinfocontactInfoRes.body.name).should.equal(manageinfocontact.name);
                        should.equal(manageinfocontactInfoRes.body.user, undefined);

                        // Call the assertion callback
                        done();
                      });
                  });
              });
            });
        });
    });
  });

  afterEach(function (done) {
    User.remove().exec(function () {
      Manageinfocontact.remove().exec(done);
    });
  });
});
