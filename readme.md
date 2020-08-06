## To test the deployed application

Here are some unprotected Get request routes to play with

http://a766bb2d5d7d911eaa87602b81cbe9d6-1105755950.us-west-2.elb.amazonaws.com/api/movies/

http://a766bb2d5d7d911eaa87602b81cbe9d6-1105755950.us-west-2.elb.amazonaws.com/api/movies/getMovies

http://a766bb2d5d7d911eaa87602b81cbe9d6-1105755950.us-west-2.elb.amazonaws.com/api/genres



## Project Overview

This project is a Node Backend application for a video rental store. This node app communicates with a Mongo Atlas DB.

This Node application is containerized and Deployed to a Kubernetes cluster using a Jenkins Pipeline. This Backend Application performs Simple CRUD operations 


## Deploying on Amazon EKS using a CI/CD pipeline

**1)** A Jenkins server needs to be provisioned to setup your CI/CD pipeline. You can follow this tutorial to setup Jenkins on an Ubuntu Server.

**2)** Once your server is provisioned, you'll need to install the dependencies using this command make setup and make install

**3)** With AWS CLI installed you can setup it up as the Jenkins User. Follow this tutorial to see how. This is to allow you run aws commands in your pipeline without getting errors. Also set up aws credentials on Jenkins dashboard.

**4)** You might need to add jenkins to your sudoer group

**5)** You might need to disable password request for the jenkins user for your pipeline to run smoothly.

**6)**  Additionally update the Jenkinsfile registry to suit your Docker hub repo.

**7)** When all of this is finished you will continue to work on Jenkins. For a good gui install BlueOcean. Set up your CI / CD pipeline and you should have it run smoothly. Notice your IAM user will have EKS access permissions.

**8)** You can get blocked when trying to access the cluster by RBAC regulation. Basically, RBAC policies set limits on the services you use and a few of your actions. Visit this [link](https://www.edureka.co/community/34714/code-error-403-when-trying-to-access-kubernetes-cluster) to see how that can be solved.

**9)** Key things to note to run the docker image locally Install docker and docker-compose  use docker-compose up. To build the image and push run ./run-docker.sh and ./upload-docker.sh



