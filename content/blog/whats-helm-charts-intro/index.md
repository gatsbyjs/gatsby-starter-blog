---
title: What's Helm Charts - Intro
date: "2023-12-12T17:33:05Z"
description: "It's common and easy to deploy services to Openshift or Kubernets using Template and CLI. However, on the growing of services, managing many configurations become a heavy load for developers. Aiming to make the work easier, Helm Charts..."
---

## Intro

It's common and easy to deploy services to Openshift or Kubernets using __Template__ and __CLI__. However, on the growing of services, managing many configurations become a heavy load for developers. Aiming to make the work easier, [Helm Charts](https://helm.sh/) comes to people's eyes, and it realy does good job managing all the services to be deployed. 

## Structure

A Helm Chart is a collection of __YAML__ files describing resources which could be used for the deployment in the Kubernetes or OpenShift, and a simple chart often looks like that: 

```shell
helm/web-app/            # An example web app
  |- Chart.yaml          # A YAML file containing information about the chart
  |- values.yaml         # The default configuration values for this chart
  |- values.schema.json  # OPTIONAL: A JSON Schema for imposing a structure on the values.yaml file
  |- charts/             # A directory containing any charts upon which this chart depends.
  |- templates/          # A directory of templates that, when combined with values,
                         # will generate valid Kubernetes manifest files.
```

So, in addition to the structured directory, what's the difference between Helm Charts and Templates? 

## Features

Here are four excellent features of Helm Charts, and each part makes Helm Charts go further far in comparison to Templates: 

* Dependency Management
* Packaging Charts
* Chart Repositoriy
* Version Control

### Dependency Management

The most renowned feature of Helm Charts is the one-click deployment of a set of microservices. As for the concept behind that, it is the __Dependency Management__. 

Within the `Chart.yaml` file, you could specify __dependencies__ that could consist multiple charts depended by the current chart. Here is an example: 

```yaml
name: web-app
apiVersion: 1.0.0
version: 1.0.0
description: An example Web App
type: Application
dependencies: 
  - name: nginx
    version: 1.2.3
    repository: "https://example.com/charts"
```

Then, you could execute: 

```shell
$ helm dependency update
```

After you update the dependencies successfully, the chart of nginx will be downloaded and placed in the `chart` directory like that: 

```shell
helm/web-app/
  |- Chart.yaml
  |- values.yaml
  |- values.schema.json
  |- charts/
    |- nginx-1.2.3.tgz
  |- templates/
```

Next, how to create a chart? Let's see how to package a helm chart. 

### Packaging Charts

The packing feature allows developers to transform the original files and directories of a Helm Chart into a tarball, and then you could use the tarball with your own configurations (may be `values.yaml`) for deployment. 

First, let's package an example chart: 

```shell
$ helm package helm/web-app --app-version 1.0.8 --version 1.0.8
```

Here I placed the chart in the directory `helm/chart_name`, and specify its __app version__ and __version__. 
Generally, the __app version__ is used for the version of docker images or the application about to be deployed in a container. 
On the other hand, the __version__ is the version of the chart itself, and you could specify it at your will. 
Both two arguments are set in the file `Chart.yaml` defaultly. 

Then, before you are going to install the chart, you could generate the template derived from the chart for double check: 

```shell
$ helm template web-app web-app-1.0.8.tgz -f helm/web-app/values.yaml 
```

Also, you could use the official linter for it: 

```shell
$ helm lint web-app-1.0.8.tgz -f helm/web-app/values.yaml 
```

Finally, deploy your chart on the Kubernetes or OpenShift: 

```shell
$ helm install web-app web-app-1.0.8.tgz -f helm/web-app/values.yaml 
```

or 

```shell
$ helm upgrade web-app web-app-1.0.8.tgz -f helm/web-app/values.yaml --install
```

### Chart Repositoriy

Now, you have created your own chart already, and it's time for you to have your own repository to store the chart. 

According to [The Chart Repository Guide][1], there are several places for you to host your own repository, such as Google Cloud Storage, Cloudsmith, JFrog Artifactory, GitHub, Github, and so on. 

By the way, on installing the Helm CLI, a repository named `stable` is added for you. you could search for its charts on CNCF [Artifact Hub][2], or execute: 

```shell
$ helm search repo stable
```

OK, let's turn back to host your own repository, and begin it with the most familiar GitHub. Before the next step, you have to know what it looks like in a repository: 

```shell
my-repo/
  |- index.yaml
  |- web-app-1.0.8.tgz
  |- web-app-1.0.8.tgz.prov
```

The first file is the index file of the repository, containing neccessary metadata about the package. You could simply generated it via: 

```shell
$ helm repo index
```

Needless to say, the second file is the chart you packaging. As for the third file, it is so-called provenance file that is generated while you package your own chart with a signature and private key. However, it is not mandatory to sign a chart for uploading it on a repository. 

Thus, after you packaging your own chart and update the `index.yaml` file, you could directly push your repository: 

```shell
$ git clone git@github.com:[GitHub ID]/my-repo/.git
$ mv helm/web-app my-repo/
$ cd my-repo/
$ git add .
$ git commit -m "add web-app chart"
$ git push
```

When you are going to access the repository, you add it via helm command: 

```shell
$ helm repo add my-repo https://github.com:[GitHub ID]/my-repo
```

or

```shell
$ helm repo add my-repo https://github.com:[GitHub ID]/my-repo --username [Your Username] --password [Your Password]
```

Then you could search all charts in these repos: 

```shell
$ helm repo list
NAME  	URL
stable	https://charts.helm.sh/stable
my-repo	https://github.com:[GitHub ID]/my-repo

$ helm search repo my-repo
NAME              CHART VERSION  APP VERSION  DESCRIPTION
my-repo/web-app   1.0.8          1.0.8        An example Web App

$ helm search repo my-repo -l
NAME              CHART VERSION  APP VERSION  DESCRIPTION
my-repo/web-app   1.0.1          1.0.1        An example Web App
my-repo/web-app   1.0.2          1.0.2        An example Web App
my-repo/web-app   1.0.3          1.0.3        An example Web App
my-repo/web-app   1.0.4          1.0.4        An example Web App
my-repo/web-app   1.0.5          1.0.5        An example Web App
my-repo/web-app   1.0.6          1.0.6        An example Web App
my-repo/web-app   1.0.7          1.0.7        An example Web App
my-repo/web-app   1.0.8          1.0.8        An example Web App
```

### Version Control

The version control is so convenient that it makes many corporaitons and teams turn to Helm Charts for the simplicity. 

Once you have logged in to your Kubernetes or OpenShift on your workstation, you can deploy charts directly, for helm would access `.kubeconfig` for authorization automatically. 

After a successful deployment, you can list your deployment with chart verion and app version:

```shell
$ helm list
NAME     NAMESPACE  REVISION  UPDATED                                  STATUS    CHART          APP VERSION
web-app  dev        8         2022-11-17 04:53:36.174486224 +0000 UTC  deployed  web-app-1.0.8  1.0.8
```

Also, you could check the historial revisions of a release: 

```shell
$ helm history web-app
REVISION  UPDATED                   STATUS      CHART          DESCRIPTION
1         Fri Oct 21 13:08:51 2022  superseded  web-app-1.0.1  An example Web App
2         Mon Oct 24 13:27:06 2022  superseded  web-app-1.0.2  An example Web App
3         Tue Oct 25 14:07:34 2022  superseded  web-app-1.0.3  An example Web App
4         Fri Oct 28 07:30:28 2022  superseded  web-app-1.0.4  An example Web App
5         Wed Nov  2 07:31:14 2022  superseded  web-app-1.0.5  An example Web App
6         Wed Nov 16 15:25:28 2022  superseded  web-app-1.0.6  An example Web App
7         Wed Nov 16 08:35:09 2022  superseded  web-app-1.0.7  An example Web App
8         Thu Nov 17 04:53:36 2022  deployed    web-app-1.0.8  An example Web App
```

Even, it's quite easy for you to rollback to a certain revision: 

```shell
$ helm rollback web-app 7
NAME: web-app
LAST DEPLOYED: Thu Nov 17 05:34:53 2022
NAMESPACE: dev
STATUS: deployed
REVISION: 7
TEST SUITE: None
```

## Conclusion

To better manage services in the cloud infrastucture like Kubernetes or Openshift, nice tools are always nice to have. 
As I mentioned and explained above, the four features of Helm Charts help developers greatly with the deployment. 

Other than the four features, there are other nice features such as [Library Charts][3], [Chart Tests][4], etc. worthy to explore. 
After all, I hope this introduction of Helm Charts could help you.

[1]: https://helm.sh/docs/topics/chart_repository/
[2]: https://artifacthub.io/
[3]: https://helm.sh/docs/topics/library_charts/
[4]: https://helm.sh/docs/topics/chart_tests/
