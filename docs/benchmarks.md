# Benchmarks

Errsole outperforms Elasticsearch by 10k requests per minute.

### Test Setup

To benchmark Errsole against Elasticsearch, we conducted tests under the following setup:

1. **Node.js Application:**
    * **Instance Type:** r7g.medium EC2 Instance
    * **Specifications:** 1 CPU, 8 GB RAM
2. **MySQL Server:**
    * **Instance Type:** m5.large EC2 Instance
    * **Specifications:** 2 CPUs, 8 GB RAM
3. **Elasticsearch Server:**
    * **Instance Type:** m5.large EC2 Instance
    * **Specifications:** 2 CPUs, 8 GB RAM
4. **Load Testing Tool:** Grafana K6

### Load Testing Scenarios

We conducted load testing under three different configurations to compare performance:

1. **Winston + Elasticsearch:**

Configured the Node.js app with Winston for logging and Elasticsearch as the storage backend.

2. **Pino + Elasticsearch:**

Configured the Node.js app with Pino for logging and Elasticsearch as the storage backend.

3. **Errsole + MySQL:**

Configured the Node.js app with Errsole for logging and MySQL as the storage backend.

### Results

Errsole demonstrated a significant performance advantage, handling 10k more requests per minute compared to Elasticsearch configurations.

<img src="https://github.com/user-attachments/assets/7eef4d6b-6849-4b73-9955-d8a71453b785" alt="errsole-vs-elasticsearch-benchmarks" width="800">