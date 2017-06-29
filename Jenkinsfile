/*
You will need to create the requisite db and db user on the machine using Jenkins
create database test_infoset;  
create user 'travis'@'localhost' identified by '';
grant all privileges on test_infoset.* to 'travis'@'localhost';
*/
pipeline {
    agent any

    stages {
        stage('Build') {
            steps {
                echo 'Building..'
                sh 'npm run build'
            }
        }
        stage('Test') {
            steps {
                sh 'npm install'
                sh 'npm run test'
            }
        }
        stage('Deploy') {
            when {
                branch 'master'
            }
            steps{
                echo 'Deploying....'
                sh 'cp -r * /home/luke/garnet'
            }
        }
    }
}
