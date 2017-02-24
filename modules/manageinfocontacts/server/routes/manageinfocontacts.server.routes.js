'use strict';

/**
 * Module dependencies
 */
var manageinfocontactsPolicy = require('../policies/manageinfocontacts.server.policy'),
  manageinfocontacts = require('../controllers/manageinfocontacts.server.controller');

module.exports = function(app) {
  // Manageinfocontacts Routes
  app.route('/api/manageinfocontacts').all(manageinfocontactsPolicy.isAllowed)
    .get(manageinfocontacts.list)
    .post(manageinfocontacts.create);

  app.route('/api/manageinfocontacts/:manageinfocontactId').all(manageinfocontactsPolicy.isAllowed)
    .get(manageinfocontacts.read)
    .put(manageinfocontacts.update)
    .delete(manageinfocontacts.delete);

  // Finish by binding the Manageinfocontact middleware
  app.param('manageinfocontactId', manageinfocontacts.manageinfocontactByID);
};
