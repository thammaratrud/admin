'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Manageinfocontact Schema
 */
var ManageinfocontactSchema = new Schema({
  Firstname : {
    type: String, 
    required: 'Please fill Manageinfocantact Firstname '
  },
    Lastname  : {
    type: String, 
    required: 'Please fill Manageinfocantact Lastname  '
  },
    Email  : {
    type: String, 
    required: 'Please fill Manageinfocantact Email  '
  },
    Phone : {
    type: String, 
    required: 'Please fill Manageinfocantact Phone '
  },
    Message  : {
    type: String, 
    required: 'Please fill Manageinfocantact Message  '
  },
  created: {
    type: Date,
    default: Date.now
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  }
});

mongoose.model('Manageinfocontact', ManageinfocontactSchema);
