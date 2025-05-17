# Backend Architecture

This document provides an overview of the backend architecture for **BitTicket**, including the structure, major components, and integration points with Bitcoin and Lightning Network.

## Framework

The backend is powered by **Next.js API Routes** for server-side logic, alongside:

* **LND (Lightning Network Daemon)** for Lightning payments
* **Bitcoin Core** for on-chain Bitcoin transactions
* **TypeScript** for type safety and development efficiency

## Folder Structure

```
src/
├── app/                    # Main application logic
│   ├── api/               # API routes
│   │   ├── events/        # Event-related API routes
│   │   ├── tickets/       # Ticket-related API routes
│   │   └── bitcoin/       # Bitcoin-related API routes
├── lib/                    # Backend service logic
│   ├── lnd.ts             # LND gRPC client for Lightning transactions
│   ├── bitcoin.ts         # Bitcoin Core client for on-chain transactions
│   ├── events.ts          # Event management logic
│   └── tickets.ts         # Ticket management logic
├── types.ts               # TypeScript type definitions
└── public/                # Public assets like images and icons
```

## Key Services

### 1. LND Client (`lnd.ts`)

Handles gRPC communication with the Lightning Network node:

* **createInvoice()** - Generates an invoice for ticket payment
* **checkInvoiceStatus()** - Monitors payment status
* **payInvoice()** - Processes outgoing payments

### 2. Bitcoin Core Client (`bitcoin.ts`)

Manages on-chain Bitcoin transactions:

* **createTransaction()** - Sends Bitcoin to a specified address
* **getTransactionStatus()** - Verifies if a transaction is confirmed
* **getBlockHeight()** - Fetches the latest block height for confirmations

### 3. Event Logic (`events.ts`)

Controls event creation and management:

* **createEvent()** - Adds a new event to the system
* **getEvents()** - Retrieves a list of all events
* **getEventById()** - Fetches details of a specific event

### 4. Ticket Logic (`tickets.ts`)

Handles ticket generation and verification:

* **createTicket()** - Issues a new ticket tied to a Bitcoin payment
* **verifyTicketOwnership()** - Confirms ownership based on Bitcoin transactions
* **transferTicket()** - Allows secure transfer of tickets between users

## Database

The current implementation leverages in-memory storage for development. Future improvements may include:

* **PostgreSQL or MongoDB** for scalable storage
* **Redis** for faster ticket verification

## Security Measures

* **Encryption** for all sensitive data
* **Double-Spend Protection** via on-chain verification
* **gRPC over TLS** for secure communication with LND

## Future Improvements

* Implementing a decentralized identity system
* Adding smart contract support for automated ticket transfers
* Enhancing DoS protection for API endpoints
