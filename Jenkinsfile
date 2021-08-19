
pipeline {
    agent { dockerfile true }
    stages {
        stage('Build') {
            steps {
                sh 'docker build . -t euvoudoar/app'
            }
        }
        stage('Running') {
            steps {
                echo 'Running Docker'
                sh 'docker run -d -p 3001:3001 -p 3002:3002 -p 3003:3003 euvoudoar/app'
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
