
pipeline {
    agent any

    stages {
        stage('Build') {
            steps {
                sh 'npm install'
                sh 'pm2 ./server.js'
            }
        }
    }
}