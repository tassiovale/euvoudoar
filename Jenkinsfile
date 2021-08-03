
pipeline {
    agent any
    stages {
        stage('Build') {
            steps {
                sh 'npm install'
            }
        }
        stage('Applying') {
            steps {
                echo 'Applying changes'
                // sh 'pm2 restart euvoudoar_server'
            }
        }
        stage('Done') {
            steps {
                echo 'Done'
            }
        }
    }
}