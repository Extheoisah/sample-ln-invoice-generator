# Frontend Architecture

This document provides an overview of the frontend architecture for **BitTicket**, including the structure, major components, and state management.

## Framework

The frontend is built using **Next.js**, a React-based framework that enables server-side rendering and static site generation for fast and optimized performance.

## Folder Structure

```
src/
├── app/                    # Main application logic
│   ├── api/               # API routes
│   │   ├── events/        # Event-related API routes
│   │   ├── tickets/       # Ticket-related API routes
│   │   └── bitcoin/       # Bitcoin-related API routes
│   ├── events/            # Event pages
│   │   ├── create/        # Event creation page
│   │   ├── [id]/          # Event details page
│   │   └── page.tsx       # Event listing page
│   └── components/        # Reusable React components
├── lib/                    # Logic for interacting with LND, Bitcoin, and events
│   ├── lnd.ts            # LND gRPC client
│   ├── bitcoin.ts        # Bitcoin Core client
│   ├── events.ts         # Event management logic
│   └── tickets.ts        # Ticket management logic
├── types.ts               # TypeScript type definitions
└── public/                # Public assets like images and icons
```

## State Management

We use **React Context API** for global state management, allowing us to share state across components without prop drilling. The main contexts include:

* **EventContext**: Manages the state of events (creation, deletion, updates).
* **TicketContext**: Handles ticket issuance, transfers, and validation.
* **UserContext**: Manages user authentication and session data.

## UI Components

* **EventCard** - Displays event details
* **TicketForm** - Handles ticket purchase form
* **EventList** - Lists all available events
* **Navbar** - Top navigation bar
* **Footer** - Footer section

## Navigation

The application uses **Next.js routing**:

* `/events` - Lists all events
* `/events/create` - Form for creating new events
* `/events/[id]` - Displays event details and purchase options

## Styling

We utilize **TailwindCSS** for utility-first styling, enabling rapid UI development with minimal custom CSS.

## Future Improvements

* Implementing dark mode support
* Adding multi-language support
* Enhancing mobile responsiveness
