'use strict';

const test = require('ava');
const mockery = require('mockery');

const configLoaderModule = '@blinkmobile/blinkmrc';
const profileModule = '../lib/profile-manager.js';

test.beforeEach(() => {
  mockery.enable({ useCleanCache: true });
  mockery.registerAllowable(profileModule, true);
  // mockery.registerAllowables(['object-merge', 'object-foreach', 'clone-function']);
});

test.afterEach(() => {
  mockery.deregisterAll();
  mockery.resetCache();
  mockery.disable();
});

test.serial('it should return the currently set profile', t => {
  const expectedProfile = 'a';
  const configHelperMock = {
    projectConfig: function () {
      return {
        load: () => Promise.resolve({profile: expectedProfile})
      };
    }
  };

  mockery.registerMock(configLoaderModule, configHelperMock);

  const Profile = require(profileModule);
  const profile = new Profile();

  return profile.read().then((s) => {
    t.same(s, expectedProfile);
    t.same(profile.name, expectedProfile);
  });
});

test.serial('it should handle an unitinitalised config file by returning the default profile', t => {
  const expectedProfile = 'default';
  const configHelperMock = {
    projectConfig: function () {
      return {
        load: () => Promise.resolve({})
      };
    }
  };

  mockery.registerMock(configLoaderModule, configHelperMock);

  const Profile = require(profileModule);
  const profile = new Profile();
  return profile.read().then((s) => {
    t.same(s, expectedProfile);
    t.same(profile.name, expectedProfile);
  });
});

test.serial('it should set default if no profile supplied', t => {
  const expectedProfile = 'default';
  const configHelperMock = {
    projectConfig: function () {
      return {
        load: () => Promise.resolve({profile: expectedProfile}),
        write: (cfg) => Promise.resolve(cfg)
      };
    }
  };

  mockery.registerMock(configLoaderModule, configHelperMock);

  const Profile = require(profileModule);
  const profile = new Profile();
  return profile.write().then((cfg) => {
    t.same(cfg.profile, expectedProfile);
    t.same(profile.name, expectedProfile);
  });
});

test.serial('it should merge new profile with the current config', t => {
  const expectedProfile = 'c';
  const originalConfig = {
    profile: 'a',
    bmp: {
      scope: 'blah'
    },
    cdn: {
      scope: 'old',
      extra: 'existing'
    },
    builder: {
      profile: 'a'
    }
  };

  const configHelperMock = {
    projectConfig: function () {
      return {
        load: () => Promise.resolve(originalConfig),
        write: (cfg) => Promise.resolve(cfg)
      };
    }
  };

  mockery.registerMock(configLoaderModule, configHelperMock);

  const Profile = require(profileModule);
  const profile = new Profile();
  return profile.write(expectedProfile).then(config => {
    t.same(config.bmp.scope, 'blah');
    t.same(config.cdn.scope, 'old');
    t.same(config.cdn.extra, 'existing');
    t.same(config.profile, expectedProfile);
  });
});
