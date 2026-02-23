pipeline {
    
    agent {
        docker {
            image 'node:18-alpine'
        }
    }

    environment {
        REACT_APP_API_KEY = credentials('covistat_api_key')
        DOCKER_IMAGE = "covistat-fe"
        BUILD_NUMBER = "0.0.1"
    }

    stages {
        stage('Install') {
            steps {
                sh 'npm install'
            }
        }

        stage('Build') {
            steps {
                sh 'CI=false npm run build'
            }
        }
        
        stage('Containerize') {
            steps {
                sh 'docker build -t $DOCKER_IMAGE:${BUILD_NUMBER} .'
            }
        }
    }
}