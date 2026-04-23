pipeline{
    agent any

    stages {

        stage('Clone Repos') {
            steps {
                git url: 'https://github.com/harcastic/Cloud-Gallery-frontend.git', branch: 'main' 
            }
        }

        stage('build'){
            steps {
                sh 'docker build -t harcastic/cgfrontend:latest .'
            }
        }
        stage('push'){
            steps{
                withCredentials([usernamePassword(
                    credentialsId: 'dockerHub',
                    usernameVariable: 'dockeruser',
                    passwordVariable: 'dockerpwd'
                )]) {
                    sh 'docker login -u $dockeruser -p $dockerpwd' 
                    sh 'docker push harcastic/cgfrontend:latest'
                }
            }
        }

        stage('pull image'){
            steps{
                sh 'docker pull harcastic/cgfrontend:latest'
            }
        }

        stage('deploy'){
            steps{
                    sh '''
                        if [ "$(docker ps -aq -f name=cgfrontend)" ]; then
                            echo "Container exists. Removing..."
                            docker rm -f cgfrontend
                        else
                            echo "No existing container."
                        fi
                    '''
                    sh 'docker run -d -p 3000:5000 --env-file /opt/app/.env --name cgfrontend harcastic/cgfrontend:latest'
            }
        }
    }

}