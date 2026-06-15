# CloudMart – Scalable Cloud-Native Microservices E-Commerce Platform

## 📌 Overview

CloudMart is a cloud-native e-commerce platform built using a microservices architecture and deployed on AWS. The project demonstrates modern DevOps practices including containerization, CI/CD automation, load balancing, auto scaling, self-healing infrastructure, and real-time monitoring.

The application consists of independent microservices for authentication, product management, and order processing, ensuring scalability, fault isolation, and high availability.

---

## 🚀 Features

- User Registration and Authentication
- Product Listing and Management
- Order Placement and Tracking
- Microservices Architecture
- Docker Containerization
- CI/CD Automation with Jenkins
- AWS EC2 Deployment
- Application Load Balancer (ALB)
- Auto Scaling Group (ASG)
- Container-Level Self-Healing
- Infrastructure-Level Auto-Healing
- Real-Time Monitoring with Prometheus & Grafana
- Traffic Management and High Availability

---

## 🏗️ Architecture

```text
Users
   │
   ▼
Application Load Balancer (ALB)
   │
   ▼
Auto Scaling Group (ASG)
   │
   ▼
EC2 Instances
   │
   ▼
Docker Containers
 ├── Frontend Service
 ├── Auth Service
 ├── Product Service
 └── Order Service
   │
   ▼
Prometheus + Grafana
```

---

## 🔧 Microservices

### Authentication Service
Responsible for:
- User Registration
- User Login
- Authentication Management

### Product Service
Responsible for:
- Product Listing
- Product Information Management

### Order Service
Responsible for:
- Order Placement
- Order Tracking
- Order Management

---

## 🛠️ Technology Stack

### Cloud & Infrastructure
- AWS EC2
- AWS VPC
- Application Load Balancer (ALB)
- Auto Scaling Group (ASG)
- Security Groups

### DevOps
- Docker
- Docker Compose
- Jenkins
- Git
- GitHub

### Backend
- Python
- FastAPI
- Uvicorn
- SQLite

### Frontend
- HTML
- CSS
- JavaScript
- NGINX

### Monitoring & Observability
- Prometheus
- Grafana

---

## 🔄 CI/CD Workflow

```text
Developer
    │
    ▼
GitHub Repository
    │
    ▼
Jenkins Pipeline
    │
    ▼
Docker Build
    │
    ▼
Deployment to AWS EC2
```

### Pipeline Stages

1. Code Commit & Push to GitHub
2. Jenkins Webhook Trigger
3. Source Code Checkout
4. Docker Image Build
5. Container Deployment
6. Service Verification
7. Monitoring & Logging

---

## 📊 Monitoring & Observability

### Prometheus
- Collects application metrics
- Monitors API requests
- Tracks service health
- Provides real-time performance data

### Grafana
- Visualizes metrics through dashboards
- Displays service health and performance
- Supports troubleshooting and monitoring

---

## ⚖️ Load Balancing & Auto Scaling

### Application Load Balancer (ALB)

- Distributes incoming traffic across healthy instances
- Prevents server overload
- Improves availability and reliability
- Routes requests efficiently

### Auto Scaling Group (ASG)

- Automatically launches new EC2 instances during high traffic
- Terminates unused instances during low traffic
- Replaces failed instances automatically
- Ensures infrastructure auto-healing

---

## 🔁 Self-Healing Mechanism

### Container-Level Self-Healing

Docker restart policies automatically restart failed containers.

```yaml
restart: always
```

### Infrastructure-Level Self-Healing

Auto Scaling Group continuously monitors instance health and automatically replaces unhealthy EC2 instances.

---

## 📂 Project Structure

```text
CloudMart
│
├── frontend
│
├── auth-service
│
├── product-service
│
├── order-service
│
├── prometheus
│
├── grafana
│
├── docker-compose.yml
│
└── Jenkinsfile
```

---

## ☁️ AWS Services Used

- Amazon EC2
- Amazon VPC
- Application Load Balancer (ALB)
- Auto Scaling Group (ASG)
- Security Groups
- Amazon Cloud Infrastructure

---

## 🎯 Key Learnings

- Cloud Infrastructure Deployment
- Microservices Architecture
- Docker Containerization
- CI/CD Pipeline Automation
- Monitoring and Observability
- Load Balancing Concepts
- Auto Scaling and High Availability
- Infrastructure Self-Healing
- AWS Networking Fundamentals

---

## 🔮 Future Enhancements

- Kubernetes Deployment
- Terraform Infrastructure as Code (IaC)
- AWS RDS Integration
- Redis Caching
- JWT-Based Authentication
- Advanced Monitoring and Alerting
- MLOps Integration

---

## 👨‍💻 Author

Harshith Rosun W

Cloud & DevOps Enthusiast | AWS | Docker | Jenkins | Python | Monitoring & Automation

---

## 🏷️ Topics

aws, devops, docker, docker-compose, jenkins, fastapi, microservices, ecommerce, prometheus, grafana, load-balancer, auto-scaling, cloud-native, python, monitoring, cicd
