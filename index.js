/**
 * AWS Profile Management
 * @name  @blinkmobile/aws-profile-management
 */
'use strict';

const ProfileManager = require('./lib/profile-manager.js');
const awsFactory = require('./lib/aws-factory.js');

const profileManager = new ProfileManager();

/**
 * .blinkmrc.json "aws profile" manager
 * @type {ProfileManager}
 */
module.exports.profile = profileManager;

/**
 * A [factory]{@link module:lib/aws-factory} for creating AWS SDK instances
 */
module.exports.awsFactory = awsFactory;
