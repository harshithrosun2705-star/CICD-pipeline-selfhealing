Cloud-Native Microservices Application with CI/CD and Monitoring

Overview
This project is a **microservices-based web application** built to demonstrate real-world DevOps practices.

It includes:
- Multiple backend services (Auth, Task, Order)
- A simple frontend for user interaction
- Containerization using Docker
- CI/CD automation
- Monitoring using Prometheus and Grafana

---

Achitecture

Frontend (Nginx)
↓ 
Auth Service (Login/Register) 
↓ 
Task Service (Manage Tasks) 
↓ 
Order Service (User Actions)

---

Tech Stack

- Backend: FastAPI  
- Frontend: HTML, CSS, JavaScript  
- Containerization: Docker  
- Orchestration: Docker Compose  
- CI/CD: Jenkins  
- Monitoring: Prometheus + Grafana  
- Version Control: GitHub  

---


---

Access the application

| Service | URL |
|--------|-----|
| Frontend | http://localhost:8001 |
| Auth API | http://localhost:8002/docs |
| Task API | http://localhost:8003/docs |
| Order API | http://localhost:8004/docs |
| Prometheus | http://localhost:9090 |
| Grafana | http://localhost:3000 |

---

Features

- User authentication (login/register)  
- Task management  
- Order creation  
- Microservices architecture  
- Real-time monitoring  
- Containerized deployment  

---

CI/CD Pipeline

- Code pushed to GitHub  
- Jenkins pipeline triggered automatically  
- Docker images built and deployed  
- Containers updated without manual intervention  

---

Monitoring

- Metrics exposed via `/metrics` endpoint  
- Collected using Prometheus  
- Visualized using Grafana dashboards  

---

Security

- Sensitive files excluded using `.gitignore`  
- Supports environment variables for secrets  

---

Key Highlights

- End-to-end DevOps implementation  
- Automated CI/CD pipeline  
- Scalable microservices architecture  
- Integrated monitoring and observability  

---

Future Improvements

- Add database (PostgreSQL)  
- Implement JWT authentication  
- Deploy using Kubernetes  
- Add API Gateway  

testing...
