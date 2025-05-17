# API Reference

This document provides a detailed reference for the API endpoints of **BitTicket**, covering routes for events, tickets, and Bitcoin transactions.

## Base URL

```
http://localhost:3000/api
```

---

## Authentication

Currently, authentication is managed via API tokens or session-based for specific admin routes. Plans for JWT-based authentication are under consideration for future releases.

---

## Events API

### **Create an Event**

```
POST /events
```

**Request Body:**

```json
{
  "name": "string",
  "date": "YYYY-MM-DD",
  "location": "string",
  "price": "number",
  "quantity": "number",
  "description": "string"
}
```

**Response:**

```json
{
  "success": true,
  "message": "Event created successfully",
  "data": {
    "eventId": "string"
  }
}
```

---

### **Get All Events**

```
GET /events
```

**Response:**

```json
[
  {
    "eventId": "string",
    "name": "string",
    "date": "YYYY-MM-DD",
    "location": "string",
    "price": "number",
    "quantity": "number",
    "description": "string"
  }
]
```

---

### **Get Event by ID**

```
GET /events/:id
```

**Response:**

```json
{
  "eventId": "string",
  "name": "string",
  "date": "YYYY-MM-DD",
  "location": "string",
  "price": "number",
  "quantity": "number",
  "description": "string"
}
```

---

## Tickets API

### **Purchase Ticket**

```
POST /tickets
```

**Request Body:**

```json
{
  "eventId": "string",
  "quantity": "number",
  "paymentMethod": "lightning" | "onchain"
}
```

**Response:**

```json
{
  "success": true,
  "message": "Ticket(s) purchased successfully",
  "data": {
    "ticketId": "string",
    "paymentStatus": "pending"
  }
}
```

---

### **Transfer Ticket**

```
POST /tickets/:id/transfer
```

**Request Body:**

```json
{
  "newOwner": "string"
}
```

**Response:**

```json
{
  "success": true,
  "message": "Ticket transferred successfully"
}
```

---

## Bitcoin API

### **Get Transaction Status**

```
GET /bitcoin/transaction/:id
```

**Response:**

```json
{
  "txId": "string",
  "status": "confirmed" | "pending",
  "blockHeight": "number"
}
```

---

### **Create Bitcoin Transaction**

```
POST /bitcoin/transaction
```

**Request Body:**

```json
{
  "address": "string",
  "amount": "number"
}
```

**Response:**

```json
{
  "success": true,
  "transactionId": "string"
}
```

---

## Future Improvements

* Add OAuth2.0 support for secure user authentication.
* Implement pagination for large event and ticket datasets.
* Enhance error handling with detailed status codes and messages.
