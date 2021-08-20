
pipeline {
    agent any
    stages {
        stage('Stop running Docker containers')
        {
            steps {
                sh 'docker stop $(docker ps -a -q)'
            }
        }
        stage('Removing stopped Docket containers')
                {
                    steps {
                        sh 'docker container prune'
                    }
                }
        stage('Build') {
            steps {
                sh 'docker build /var/lib/jenkins/workspace/euvoudoar -t euvoudoar/app'
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
