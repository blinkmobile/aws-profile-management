'use strict';

const configLoader = require('@blinkmobile/blinkmrc');
const projectConfig = configLoader.projectConfig();

const privateVars = new WeakMap();
const DEFAULT = 'default';

/**
 * Manages the project's .blinkmrc.json file's "project" setting
 */
class ProfileManager {
  constructor () {
    privateVars.set(this, {profileName: DEFAULT});
  }

  /**
   * The profile name in use
   * @default  default
   * @return {string} profile name
   */
  get name () {
    return privateVars.get(this).profileName;
  }

  /**
   * Reads the project name from the projects .blinkmrc.json
   * @default  {Promise<string>} Resolves with 'default'
   * @return {Promise<string>} Resolves with the profile name
   */
  read () {
    return projectConfig.load()
      .catch(() => ({profile: this.name}))
      .then((cfg) => {
        if (!cfg.profile) {
          cfg.profile = DEFAULT;
        }

        privateVars.get(this).profileName = cfg.profile;
        return cfg.profile;
      });
  }

  /**
   * Writes the profileName to .blinkmrc.json's root object, then sets this.name
   * @param  {string} profileName The profile name to set
   * @return {Promise<string>}             A Promise that resolves with the entire contents of .blinkmrc.json
   */
  write (profileName) {
    return projectConfig.load()
      .then((cfg) => {
        cfg.profile = profileName || DEFAULT;

        return projectConfig.write(cfg).then((cfg) => {
          privateVars.get(this).profileName = cfg.profile;
          return cfg;
        });
      });
  }

  /**
   * Reads .blinkmrc.json and displays the profilename
   * @return {undefined}
   */
  show () {
    this.read().then((profileName) => console.log(`AWS Profile is "${profileName}"`));
  }
}

module.exports = ProfileManager;
