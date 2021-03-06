# AWS Profile Management

A module that handles [AWS Shared Ini credentials](http://docs.aws.amazon.com/AWSJavaScriptSDK/guide/node-configuring.html) profile names with [.blinkmrc.json](https://github.com/blinkmobile/blinkmrc.js)

It is meant to be used by our CLI tools

## Installation

`npm i --save @blinkmobile/aws-profile-management`

## Documentation

The source is jsdoc commented, HTML documentation can be generated by running `npm run make-docs` inside the modules folder.

There is no validation that the profile exists in `~/.aws/credentials`

### Quickstart

```javascript
const awsProfileManager = require('@blinkmobile/aws-profile-management');
console.log(awsProfileManager.profile.name); // 'default'

awsProfileManager.profile.read().then(profile => {
  console.log(profile); // value of the profile property in .blinkmrc.json

  return awsProfileManager.awsFactory(profile); // AWS SDK using the selected profile
});

awsProfileManager.profile.write('my-profile').then(cfg => {
  console.log(cfg); // the entire JSON structure held in .blinkmrc.json, with the profile property updated to be 'my-profile'
});

awsProfileManager.profile.show(); // value of the profile property in .blinkmrc.json
```
