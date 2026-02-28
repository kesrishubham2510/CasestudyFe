pipeline {
    
    agent any

    environment {
        REACT_APP_API_KEY = credentials('covistat_api_key')
        DOCKER_IMAGE = "covistat-fe"
    }

    stages {
        stage('React App Build') {
             agent {
                docker {
                    image 'node:18-alpine'
                }
              }

            steps {
                sh 'npm install'
                sh 'CI=false npm run build'
            }
        }
        
        stage('Containerize') {
            steps {
                sh 'docker build -t $DOCKER_IMAGE:0.0.1 .'
            }
        }
    }
}