# BitTicket Documentation

A decentralized ticketing platform powered by Bitcoin, allowing event organizers to create and manage events with Bitcoin-based tickets. Each ticket is cryptographically tied to a verifiable Bitcoin transaction, enabling secure ownership verification, resale, and fraud prevention.

# Overview

BitTicket is designed to:

* Create and manage events with Bitcoin-based ticketing.
* Generate and verify tickets using Bitcoin transactions.
* Handle ticket payments via the Lightning Network or on-chain transactions.
* Enable secure ticket resale and transfers.
* Verify ticket ownership using blockchain explorers.
* Build a modern UI for event discovery and ticket management.

---

## Prerequisites

* **Node.js v18** or later
* Access to an **LND node** (we use [Polar](https://lightningpolar.com/) for development)
* Access to a **Bitcoin Core node**
* Basic understanding of **TypeScript** and **React**
* Basic understanding of the **Lightning Network** and **Bitcoin blockchain**

---

## Quick Start Guide

### **1- Clone the Repository:**

```bash
git clone https://github.com/Hamza1610/LTicket.git
cd LTicket
```

### **2- Install Dependencies:**

```bash
npm install
```

### **3- Configure LND and Bitcoin Nodes:**

* Update `src/lib/lnd.ts` with your LND node configurations.
* Update `src/lib/bitcoin.ts` with your Bitcoin Core node configurations.

### **4- Start the Development Server:**

```bash
npm run dev
```

Visit `http://localhost:3000` to access the application.

---

## Front-End Documentation

The front-end of **BitTicket** is built with **Next.js** and **TypeScript**. Below is a breakdown of the main structure and components:

### **Directory Structure**

```bash
src/
├── app/
│   ├── events/
│   │   ├── create/        # Event creation page
│   │   ├── [id]/          # Event details page
│   │   └── page.tsx       # Event listing
│   ├── components/
│   │   ├── EventCard.tsx  # Displays individual event details
│   │   ├── TicketCard.tsx # Displays ticket information
│   │   └── NavBar.tsx     # Navigation bar component
│   ├── layout.tsx         # Main layout configuration
│   └── page.tsx           # Landing page
```

### **Components Overview**

* **EventCard.tsx:** Shows event information such as name, date, and location.
* **TicketCard.tsx:** Displays ticket ownership details and QR code for verification.
* **NavBar.tsx:** Provides navigation links to Home, Create Event, and My Tickets.
* **EventForm.tsx:** Handles event creation form submission.

### **Routes Overview**

* `/`: Main landing page
* `/events`: Lists all available events
* `/events/create`: Form to create new events
* `/events/[id]`: Details of a specific event, including purchase options
* `/tickets/[id]`: Ticket details and verification options

---

## Deployment Steps

### **1- Deploy on Vercel (Front-end):**

* Connect your GitHub repository to Vercel.
* Configure environment variables for LND and Bitcoin nodes.
* Deploy the project.

### **2- Deploy LND and Bitcoin Nodes:**

* Use Docker or a VPS to set up LND and Bitcoin Core.
* Ensure both nodes are accessible via the internet if deploying globally.

### **3- Configure Front-end to Use Public Endpoints:**

* Update `lnd.ts` and `bitcoin.ts` with public endpoints if necessary.

### **4- Monitor and Test:**

* Use tools like `lncli` for LND and `bitcoin-cli` for Bitcoin Core to test connectivity.

---

## Usage Instructions

### **Event Management:**

* Navigate to the event creation page.
* Fill out event details (name, date, location, price).
* Save the event, which gets registered on the blockchain.

### **Ticket Issuance:**

* Users can select events and purchase tickets.
* Payments are processed via the Lightning Network or on-chain.
* Tickets are linked to Bitcoin transactions and can be verified.

### **Ticket Verification:**

* Users can verify ticket ownership using QR codes.
* Blockchain explorers can be used to check authenticity.

### **Ticket Resale & Transfers:**

* Allows secure, peer-to-peer transfer of tickets.
* Ticket history is maintained on-chain for transparency.

---

## API Reference

### **Events**

```typescript
POST /api/events
Body: {
  name: string;
  date: string;
  location: string;
  price: number;
  quantity: number;
  description: string;
}

GET /api/events
Response: Event[]

GET /api/events/[id]
Response: Event
```

### **Tickets**

```typescript
POST /api/tickets
Body: {
  eventId: string;
  quantity: number;
  paymentMethod: "lightning" | "onchain";
}

GET /api/tickets/[id]
Response: Ticket

POST /api/tickets/[id]/transfer
Body: {
  newOwner: string;
}
```

---

## Best Practices

1. **Security**

   * Secure storage of event credentials.
   * Proper validation of ticket ownership.
   * Protection against double-spending.

2. **User Experience**

   * Clear event discovery interface.
   * Simple ticket purchase flow.
   * Intuitive resale process.

3. **Blockchain Integration**

   * Efficient transaction management.
   * Proper fee handling.
   * Reliable payment confirmation.

---

## Contributing

1. **Fork the Repository**
2. **Create a Feature Branch**
3. **Submit a Pull Request**

---

## License

MIT License - Feel free to use this code for learning and development.

---

## Acknowledgements

* Bitcoin Core Development Team
* Lightning Network Contributors
* Next.js Community

