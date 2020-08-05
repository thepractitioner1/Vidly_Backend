pipeline {
     agent any
     environment {
        registry = "thepract/vidly"
        registryCredential = 'dockerhub'
        dockerImage = ''
    }
     stages {
         stage('Build Docker Image') {
            steps{
                script {
                    dockerImage = docker.build registry + ":$BUILD_NUMBER"
                }
            }
         } 
         
     }

     stage('Upload Image to Docker hub') {
            steps{
                script {
                    docker.withRegistry( '', registryCredential ) {
                        dockerImage.push()
                    }
                }
            }
        }
}
