pipeline {
    agent any

    stages {

        stage('Clone Repository') {
            steps {
                git branch: 'main', url: 'https://github.com/harshithrosun2705-star/CICD-pipeline-selfhealing.git'
            }
        }

        stage('Build Containers') {
            steps {
                sh 'docker-compose build --no-cache'
            }
        }

        stage('Stop Old Containers') {
            steps {
                sh 'docker-compose down'
            }
        }

        stage('Deploy Updated Containers') {
            steps {
                sh 'docker-compose up -d'
            }
        }

        stage('Verify Running Containers') {
            steps {
                sh 'docker ps'
            }
        }
    }

    post {
        success {
            echo 'CI/CD Deployment Successful 🚀'
        }

        failure {
            echo 'Pipeline Failed ❌'
        }
    }
} 
