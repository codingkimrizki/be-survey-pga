pipeline {
    agent {
        label "${params.DEPLOY_ENV == 'prod' ? 'production' : 'staging'}"
    }

    parameters {
        choice(name: 'DEPLOY_ENV', choices: ['dev', 'staging', 'prod'], description: 'Deployment environment')
    }

    environment{
        PROJECT_DIR = "${params.DEPLOY_ENV == 'prod' ? '/srv/workspace/survey' : (params.DEPLOY_ENV == 'staging' ? '/home/iotpe/workspace/survey-pga/be-survey-pga' : '/tmp/...')}"

        COMPOSE_FILE = "${params.DEPLOY_ENV == 'prod' ? 'docker-compose.yaml' : (params.DEPLOY_ENV == 'staging' ? 'docker-compose.yaml' : 'docker-compose.dev.yaml')}"
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Sync Code to Server Dir') {
            steps {
                sh """
                    mkdir -p ${PROJECT_DIR}

                    rsync -av --delete ${WORKSPACE}/ ${PROJECT_DIR}/
                """
            }
        }

        stage('Stop Docker Container') {
            steps {
                dir("${PROJECT_DIR}") {
                    sh "docker compose -f ${COMPOSE_FILE} down || true"  
                }
            }
        }

        stage('Build & Start Docker Container') {
            steps {
                dir("${PROJECT_DIR}") {
                    sh "docker compose -f ${COMPOSE_FILE} up --build -d"
                }
            }
        }

        stage('Cleanup') {
            steps {
                dir(env.PROJECT_DIR) {
                    script {
                        echo 'Removing dangling images...'
                        sh 'docker image prune -f || true'
                        echo 'Dangling images cleanup complete...'
                    }
                }
            }
        }
    }

    post {
        success {
            emailext(
                subject: "[SUCCESS] Jenkins Build ${currentBuild.fullDisplayName}",
                body: "Build ${env.JOB_NAME} #${env.BUILD_NUMBER} finished successfully!",
                to: "ariz.muajianisan.2q@hirose-gl.com, rian.kurniawan.6n@hirose-gl.com, rizki.ardianto.9b@hirose-gl.com"
            )
        }
        failure {
            emailext(
                subject: "[FAILED] Jenkins Build ${currentBuild.fullDisplayName}",
                body: "Build ${env.JOB_NAME} #${env.BUILD_NUMBER} failed!",
                to: "ariz.muajianisan.2q@hirose-gl.com, rian.kurniawan.6n@hirose-gl.com, rizki.ardianto.9b@hirose-gl.com"
            )
        }
    } 
}
