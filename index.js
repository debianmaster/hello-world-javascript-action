const core = require('@actions/core');
const github = require('@actions/github');
const execa = require('execa');
const waitOn = require('wait-on');

try {
  const version = core.getInput('version');
  const kubeconfig_location="/tmp/output/kubeconfig-"+version+".yaml";
  console.log(`storing kubeconfig here ${kubeconfig_location}!`);  
  execa('docker', ["run","-d","--privileged","--name=k3s-"+version,
  "-e","K3S_KUBECONFIG_OUTPUT="+kubeconfig_location,
  "-e","K3S_KUBECONFIG_MODE=666",
  "-v","/tmp/output:/tmp/output","-p","6443:6443",
  "rancher/k3s:"+version,"server"]).stdout.pipe(process.stdout)
  core.setOutput("kubeconfig", kubeconfig_location);
  core.exportVariable('envVar', 'Val');
  const opts = {
    resources: [kubeconfig_location],
    delay: 1000, // initial delay in ms, default 0
  interval: 100, // poll interval in ms, default 250ms
  timeout: 30000};
  waitOn(opts, function (err) {
    if (err) {
      console.log("all bad")
      return;
    }
    console.log("all good")
  });

} catch (error) {
  core.setFailed(error.message);
}
