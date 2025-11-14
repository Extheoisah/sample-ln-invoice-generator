# Lightning Invoice App

A reference implementation for Africa Free Routing 2025 (Accra) bootcamp students demonstrating how to interact with a Lightning Network node using gRPC and Next.js.

## Overview

This application demonstrates how to:

- Connect to an LND node using gRPC
- Generate Lightning invoices
- Monitor invoice payment status
- Build a modern UI for Lightning payments
- Explore Bitcoin blockchain data in real-time
- Monitor mempool statistics and transaction fees

## Prerequisites

- Node.js v18 or later
- Access to an LND node (we use [Polar](https://lightningpolar.com/) for development)
- Access to a Bitcoin Core node
- Basic understanding of TypeScript and React
- Basic understanding of the Lightning Network and Bitcoin blockchain

## Getting Started

1. Clone the repository:

```bash
git clone https://github.com/Extheoisah/sample-ln-invoice-generator.git
cd sample-ln-invoice-generator
```

2. Install dependencies:

```bash
npm install
```

3. Configure your LND connection:

   - Open `src/lib/lnd.ts`
   - Update the `DEFAULT_CONFIG` with your LND node's:
     - `rpcServer` address
     - `tlsCertPath` location
     - `macaroonPath` location

4. Configure your Bitcoin Core connection:

   - Open `src/lib/bitcoin.ts`
   - Update the `DEFAULT_CONFIG` with your Bitcoin node's:
     - `host` address
     - `port` number
     - `username` and `password`
     - `network` type (mainnet/testnet)

5. Start the development server:

```bash
npm run dev
```

## Project Structure

```bash
src/
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   │   ├── invoice/       # Invoice-related endpoints
│   │   └── bitcoin/       # Bitcoin-related endpoints
│   └── components/        # React components
├── lib/
│   ├── lnd.ts            # LND gRPC client
│   ├── bitcoin.ts        # Bitcoin Core client
│   └── utils.ts          # Utility functions
└── types.ts              # TypeScript type definitions
```

## Key Concepts

### 1. LND gRPC Connection

The `LndClient` class in `src/lib/lnd.ts` handles the gRPC connection to your Lightning node:

```typescript
class LndClient {
  // Establishes secure connection using TLS cert and macaroon
  private buildServices(): LndServices {
    const tlsCert = fs.readFileSync(this.config.tlsCertPath);
    const macaroon = fs.readFileSync(this.config.macaroonPath);
    // ... setup gRPC connection
  }

  // Create an invoice
  async createInvoice(amount: number, memo: string, expiry: number): Promise<LndInvoice>

  // Check payment status
  async checkInvoiceStatus(rHash: Buffer): Promise<LndInvoice>
}
```

### 2. Bitcoin Blockchain Explorer

The `BlockchainExplorer` component in `src/app/components/blockchain-explorer.tsx` provides a real-time view of the Bitcoin blockchain:

- Live block visualization with drag-to-scroll interface
- Detailed block information including:
  - Block height and hash
  - Transaction count and fees
  - Block size and weight
  - Mining difficulty
  - Timestamp and miner information
- Transaction details within blocks
- Real-time mempool statistics:
  - Unconfirmed transaction count
  - Memory usage
  - Fee rates (low, medium, high, urgent priority)
  - Minimum relay fees

```typescript
// Example: Fetching block data
const blockResponse = await fetch("/api/bitcoin/blocks?limit=10");
const blockData = await blockResponse.json();

// Example: Fetching mempool statistics
const mempoolResponse = await fetch("/api/bitcoin/mempool");
const mempoolData = await mempoolResponse.json();
```

### 3. Invoice Generation

To generate an invoice:

1. The frontend sends amount and memo to `/api/invoice`
2. The API calls `lndClient.createInvoice()`
3. Returns a payment request and other invoice details

### 4. Payment Monitoring

The app demonstrates two important patterns:

1. Converting between Buffer and hex strings for gRPC communication
2. Polling for payment status using `setInterval`

## API Reference

### Generate Invoice

```typescript
POST /api/invoice
Body: {
  amount: number;    // Amount in satoshis
  memo: string;      // Invoice description
  expiry?: number;   // Expiry in seconds (default: 3600)
}
```

### Check Payment Status

```typescript
GET /api/invoice/[rHash]/status
Response: {
  isPaid: boolean;
}
```

## Common Tasks

### 1. Creating a New Invoice

```typescript
const invoice = await lndClient.createInvoice(
  1000,              // amount in sats
  "Test payment",    // memo
  3600              // expiry in seconds
);
```

### 2. Checking Payment Status

```typescript
const status = await lndClient.checkInvoiceStatus(rHashBuffer);
const isPaid = status.state === "SETTLED" || status.settled === true;
```

### 3. Converting Buffer to Hex

```typescript
// From Buffer to hex string
const hexString = buffer.toString("hex");

// From hex string to Buffer
const buffer = Buffer.from(hexString, "hex");
```

## Best Practices

1. **Error Handling**: Always wrap LND calls in try-catch blocks
2. **Type Safety**: Use TypeScript interfaces for all LND responses
3. **Buffer Handling**: Properly convert between Buffer and hex strings
4. **Payment Monitoring**: Implement proper cleanup for payment polling
5. **Security**: Never expose macaroons or TLS certs in the frontend

## Common Issues

1. **Connection Failed**
   - Check if LND node is running
   - Verify TLS cert and macaroon paths
   - Ensure proper permissions on cert files

2. **Type Errors**
   - LND returns snake_case properties
   - Convert to camelCase for frontend use
   - Use proper TypeScript interfaces

3. **Buffer Handling**
   - gRPC expects Buffer for binary data
   - Frontend needs hex strings
   - Always convert appropriately

## Additional Resources

- [LND API Reference](https://api.lightning.community/)
- [gRPC Concepts](https://grpc.io/docs/what-is-grpc/core-concepts/)
- [Polar Documentation](https://lightningpolar.com/docs/intro)
- [Lightning Network Specifications](https://github.com/lightning/bolts)

## Contributing

This is a reference implementation for educational purposes. If you find bugs or have improvements:

1. Open an issue
2. Submit a pull request
3. Update documentation

## License

MIT License - Feel free to use this code for learning and development.
