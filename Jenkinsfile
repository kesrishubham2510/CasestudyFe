pipeline {
    
    agent any

    environment {
        REACT_APP_API_KEY = credentials('covistat_api_key')
        SONAR_TOKEN = credentials('sonar-server-user-token')
        SONAR_SEVER = 'http://sonar-server:9000'
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
                sh 'npm run test'
                sh 'apk add openjdk17-jre'
                sh 'npx sonar-scanner -Dsonar.login=$SONAR_TOKEN -Dsonar.host.url=$SONAR_SEVER'
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