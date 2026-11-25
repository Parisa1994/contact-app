# Contacts App

A React application for browsing contacts, searching by first or last name, viewing details and revisiting up to four recently viewed contacts.

## Getting started

Requirements: Node.js and npm, and a compatible contacts API.

```bash
git clone https://github.com/Parisa1994/contact-app.git
cd contact-app
npm ci
npm start
```

Open http://localhost:3000. The development configuration in `.env.development` points to `http://localhost:1337/`. Set `REACT_APP_SERVER_BASE_URL` to your API base URL (including its trailing slash) in `.env.local` to override it, then restart the development server.

This repository does not include the backend. The contacts screen expects a `GET passenger` endpoint accepting pagination, filter and ordering query parameters and returning an object with `data.items` and `meta.total`. If the API is unavailable, the app displays a retry option. Details can be reopened from the list or from the locally stored recently visited contacts; a direct link to an unknown contact cannot retrieve it without a detail endpoint.

```bash
npm test -- --watch=false
npm run build
```

## Stack

React, React Router, TanStack Query and Material UI. Recently visited contact data is stored in the browser's local storage; use sample data when sharing a device.
