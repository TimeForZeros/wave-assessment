# Wave Assessemnt
## Getting Started
To download all the necessary packages run the following:
```
pnpm install
```
Then bundle the application with
```
pnpm build
```
And finally, you can run the build using the following
```
pnpm start
```
you will now be able to access the application here: [http://localhost:3000](http://localhost:3000/)

## Tech Stack & Architecture

### State Management

Zustand for client-side state (simple, lightweight global state)
Tanstack Query for server-state (caching, synchronization, and data fetching)
Why this combination?
While Zustand could handle all state needs, Tanstack Query provides specialized features for async data (caching, background updates, deduplication) that are valuable in production-scale applications.

Styling:

TailwindCSS + shadcn/ui for utility-first CSS and customizable, accessible UI components.

## Key Libraries:
**Tanstack Table**: Feature-rich table rendering with built-in server-side pagination/sorting, compatible with Tailwind/shadcn.
**Forms**: react-hook-form + zod for type-safe validation and seamless integration with the UI components
