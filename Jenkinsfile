pipeline {
    
    agent {
        docker {
            image 'node:18-alpine'
        }
    }

    environment {
        REACT_APP_API_KEY = credentials('covistat_api_key')
    }

    stages {
        stage('Install') {
            steps {
                sh 'npm install'
            }
        }

        stage('Build') {
            steps {
                sh 'npm run build'
            }
        }
    }
}