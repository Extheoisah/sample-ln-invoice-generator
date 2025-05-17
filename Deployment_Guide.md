# Deployment Guide

This document outlines the steps to deploy **BitTicket** both locally for development and on a cloud service for production.

## Local Deployment

### Prerequisites:

* Node.js v18 or later
* NPM or Yarn
* Access to an LND node (we use [Polar](https://lightningpolar.com/) for development)
* Access to a Bitcoin Core node

### Steps:

1. **Clone the repository:**

   ```bash
   git clone https://github.com/Hamza1610/LTicket.git
   cd LTicket
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Set up environment variables:**
   Create a `.env` file in the root of your project and add:

   ```env
   LND_RPC_SERVER=<Your LND RPC Server>
   LND_TLS_CERT=<Path to your TLS cert>
   LND_MACAROON=<Path to your Macaroon file>
   BITCOIN_RPC_HOST=<Your Bitcoin Node Host>
   BITCOIN_RPC_PORT=<Bitcoin Node Port>
   BITCOIN_RPC_USER=<Your RPC Username>
   BITCOIN_RPC_PASSWORD=<Your RPC Password>
   NETWORK=<mainnet | testnet>
   ```

4. **Run the development server:**

   ```bash
   npm run dev
   ```

5. **Access the application:**
   Navigate to `http://localhost:3000` in your browser.

---

## Production Deployment

### Prerequisites:

* Docker
* Access to cloud services like AWS, DigitalOcean, or Vercel

### Steps:

1. **Build the application:**

   ```bash
   npm run build
   ```

2. **Run Docker Compose:**

   ```bash
   docker-compose up -d
   ```

3. **Configure NGINX (if applicable):**

   * Use NGINX as a reverse proxy for HTTPS and load balancing.

4. **Deploy to Cloud Provider:**

   * If using Vercel, simply connect the GitHub repository.
   * For AWS/DigitalOcean, deploy the Docker container directly.

5. **Access the application:**
   Navigate to your cloud instance's public IP or domain.

---

## CI/CD Integration

* Use GitHub Actions for continuous integration:

  * Lint and test on every push
  * Auto-deploy on main branch merge

* **Sample GitHub Action Workflow:**

  ```yaml
  name: Deploy to Vercel

  on:
    push:
      branches:
        - main

  jobs:
    deploy:
      runs-on: ubuntu-latest
      steps:
        - uses: actions/checkout@v2
        - name: Install dependencies
          run: npm install
        - name: Build project
          run: npm run build
        - name: Deploy to Vercel
          run: vercel --prod
  ```

---

## Future Improvements

* Automate database backups during deployment.
* Enable monitoring with Prometheus and Grafana.
* Implement automatic rollback on failed deployments.
