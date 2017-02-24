'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Manageinfocontact = mongoose.model('Manageinfocontact'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  _ = require('lodash');

/**
 * Create a Manageinfocontact
 */
exports.create = function(req, res) {
  var manageinfocontact = new Manageinfocontact(req.body);
  manageinfocontact.user = req.user;

  manageinfocontact.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(manageinfocontact);
    }
  });
};

/**
 * Show the current Manageinfocontact
 */
exports.read = function(req, res) {
  // convert mongoose document to JSON
  var manageinfocontact = req.manageinfocontact ? req.manageinfocontact.toJSON() : {};

  // Add a custom field to the Article, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Article model.
  manageinfocontact.isCurrentUserOwner = req.user && manageinfocontact.user && manageinfocontact.user._id.toString() === req.user._id.toString();

  res.jsonp(manageinfocontact);
};

/**
 * Update a Manageinfocontact
 */
exports.update = function(req, res) {
  var manageinfocontact = req.manageinfocontact;

  manageinfocontact = _.extend(manageinfocontact, req.body);

  manageinfocontact.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(manageinfocontact);
    }
  });
};

/**
 * Delete an Manageinfocontact
 */
exports.delete = function(req, res) {
  var manageinfocontact = req.manageinfocontact;

  manageinfocontact.remove(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(manageinfocontact);
    }
  });
};

/**
 * List of Manageinfocontacts
 */
exports.list = function(req, res) {
  Manageinfocontact.find().sort('-created').populate('user', 'displayName').exec(function(err, manageinfocontacts) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(manageinfocontacts);
    }
  });
};

/**
 * Manageinfocontact middleware
 */
exports.manageinfocontactByID = function(req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Manageinfocontact is invalid'
    });
  }

  Manageinfocontact.findById(id).populate('user', 'displayName').exec(function (err, manageinfocontact) {
    if (err) {
      return next(err);
    } else if (!manageinfocontact) {
      return res.status(404).send({
        message: 'No Manageinfocontact with that identifier has been found'
      });
    }
    req.manageinfocontact = manageinfocontact;
    next();
  });
};
