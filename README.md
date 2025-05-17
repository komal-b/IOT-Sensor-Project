# 🌐 IoT Sensor Dashboard

A full-stack, production-ready IoT sensor monitoring system that combines a **React-based frontend** and a **FastAPI + PySpark backend** to visualize, analyze, and alert on real-time sensor data.

---

## 📌 Overview

This project simulates real-time IoT sensor monitoring. It displays machine status and environmental data on a responsive dashboard, detects anomalies, and triggers alerts. The system uses Spark for scalable data processing and FastAPI for exposing APIs to the frontend.

---

## 🧱 Tech Stack

### Frontend
- ⚛️ React (Vite)
- 🎨 Tailwind CSS
- 📦 npm

### Backend
- 🐍 FastAPI
- 🔥 PySpark
- 🐘 Pandas
- 📂 CSV I/O

---

### 🔧 Backend Setup
pip install -r requirements.txt
uvicorn app:app

### 💻 Frontend Setup
npm start

###  Features
📊 Dashboard Metrics that shows total alerts and total machine
🚨 Toast Alerts: Triggered when threshold breaches are detected
🧠 Top Machines View by logs
📈 Real-time Graphs on machine health summary which gives details on vibration, temperature and pressure

### 📸 Sample UI

<img width="1394" alt="image" src="https://github.com/user-attachments/assets/f6e1dfd2-a9c8-42c9-83a9-50be36fb2bea" />

### 🧪 Example Use Case
Imagine this dashboard deployed in a smart factory:
Sensors on each machine stream data to a central server
PySpark processes the batch data and identifies top-performing and underperforming machines
FastAPI serves this data to the frontend
Engineers view insights, receive alerts, and export data for audits

### 👥 Author
Komal Bagwe

