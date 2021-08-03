
pipeline {
    agent any
    stages {
        stage('Build') {
            steps {
                sh 'npm install'
            }
        }
        stage('Test') {
            steps {
                echo 'Applying changes'
            }
        }
        stage('Deploy') {
            steps {
                sh 'pm2 restart euvoudoar_server'
            }
        }
    }
}