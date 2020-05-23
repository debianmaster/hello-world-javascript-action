const core = require('@actions/core');
const github = require('@actions/github');
const execa = require('execa');

try {
  // `who-to-greet` input defined in action metadata file
  const version = core.getInput('version');
  console.log(`Hello ${version}!`);
  const time = (new Date()).toTimeString();
  core.setOutput("time", time);
  
  execa('echo', ['unicorns']).stdout.pipe(process.stdout);

  const payload = JSON.stringify(github.context.payload, undefined, 2)
  console.log(`The event payload: ${payload}`);
} catch (error) {
  core.setFailed(error.message);
}
