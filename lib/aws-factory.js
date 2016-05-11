/**
 * AWS Factory Module
 * @module  lib/aws-factory
 */
'use strict';

const AWS = require('aws-sdk');
const memoize = require('lodash.memoize');

/**
 * Sets up the AWS SDK with the supplied credentials.
 * The function is memoized.
 *
 * @param  {string} profileName The profilename to load. Deafults to 'default'
 * @return {AWS}             The AWS SDK Configured with the credentials for profileName
 */
function factory (profileName) {
  if (profileName) {
    const credentials = new AWS.SharedIniFileCredentials({profile: profileName});
    AWS.config.credentials = credentials;
  }

  return AWS;
}

module.exports = memoize(factory);
