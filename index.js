const core = require('@actions/core');
const github = require('@actions/github');
const execa = require('execa');

try {
  const version = core.getInput('version');
  const kubeconfig_location="/tmp/output/kubeconfig-"+version+".yaml";
  console.log(`Hello ${version}!`);  
  execa('docker', ["docker","run","-d","--privileged","--name=k3s-"+version,
  "-e","K3S_KUBECONFIG_OUTPUT="+kubeconfig_location,
  "-e","K3S_KUBECONFIG_MODE=666",
  "-v","/tmp/output:/tmp/output","-p","6443:6443",
  "rancher/k3s:"+version,"server"]).stdout.pipe(process.stdout)
  core.setOutput("kubeconfig", kubeconfig_location);
} catch (error) {
  core.setFailed(error.message);
}
