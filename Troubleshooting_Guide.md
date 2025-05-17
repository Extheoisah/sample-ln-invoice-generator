# Troubleshooting Guide

This guide provides solutions for common issues encountered while using **BitTicket**.

---

## 1. Dependencies Not Installing

**Problem:** Running `npm install` fails with dependency errors.

**Solution:**

1. Ensure you are using Node.js version 18 or later:

   ```bash
   node -v
   ```
2. Clear npm cache and try reinstalling:

   ```bash
   npm cache clean --force
   rm -rf node_modules
   rm package-lock.json
   npm install
   ```
3. If the issue persists, try switching to Yarn:

   ```bash
   yarn install
   ```

---

## 2. LND Connection Issues

**Problem:** Unable to connect to LND node.

**Solution:**

1. Verify LND is running with the correct configurations.
2. Check the `rpcServer`, `tlsCertPath`, and `macaroonPath` in `src/lib/lnd.ts`.
3. Run:

   ```bash
   lncli getinfo
   ```

   to ensure the node is responding.
4. Ensure there are no firewall restrictions blocking the ports.

---

## 3. Bitcoin Core Connection Issues

**Problem:** Unable to connect to the Bitcoin Core node.

**Solution:**

1. Verify your `bitcoin.conf` has the correct RPC settings:

   ```conf
   server=1
   rpcuser=yourusername
   rpcpassword=yourpassword
   rpcport=8332
   ```

2. Check if Bitcoin Core is running:

   ```bash
   bitcoin-cli getblockchaininfo
   ```

3. Make sure the configurations in `src/lib/bitcoin.ts` are accurate.

---

## 4. API Routes Not Responding

**Problem:** API requests return a `404` or `500` error.

**Solution:**

1. Ensure the server is running:

   ```bash
   npm run dev
   ```
2. Check the API route in the `src/app/api` folder.
3. Review Next.js logs for detailed errors.

---

## 5. UI Not Displaying Properly

**Problem:** The UI is blank or components are not rendering.

**Solution:**

1. Verify dependencies are installed correctly.
2. Check for missing environment variables.
3. Run:

   ```bash
   npm run build && npm run dev
   ```

---

## 6. Ticket Verification Fails

**Problem:** Tickets are not validating correctly during scanning.

**Solution:**

1. Verify the blockchain transaction ID associated with the ticket.
2. Ensure the event ID matches during verification.
3. Check for any sync issues with the blockchain explorer.

---

## Need More Help?

If you encounter issues not listed here, please reach out on GitHub Issues or refer to the documentation for more details.
