# Contacts App

A React application for browsing contacts, searching by first or last name, viewing details and revisiting up to four recently viewed contacts.

**[Live demo](https://parisa-contacts-demo.astralpeony19.chatgpt.site/)** — uses fictional contacts and requires no backend.

## Getting started

Requirements: Node.js and npm. By default the app uses fictional sample contacts and does not need a backend.

```bash
git clone https://github.com/Parisa1994/contact-app.git
cd contact-app
npm ci
npm start
```

Open http://localhost:3000. Demo mode supports search, sorting, pagination, and direct links to sample contact details. Sample data is fictional.

## Connecting a real API

Create `.env.local` with the following values and restart the development server:

```env
REACT_APP_DATA_SOURCE=api
REACT_APP_SERVER_BASE_URL=http://localhost:1337/
```

Use your API base URL including the trailing slash. Do not put secrets in `REACT_APP_` variables: they are exposed in the browser.

This repository does not include the backend. In API mode, the contacts screen expects a `GET passenger` endpoint accepting pagination, filter and ordering query parameters and returning an object with `items` and `meta.total`. If the API is unavailable, the app displays a retry option. In API mode, a direct link to an unknown contact cannot retrieve it without a detail endpoint.

```bash
npm test -- --watch=false
npm run build
```

## Stack

React, React Router, TanStack Query and Material UI. Recently visited contact data is stored in the browser's local storage; use sample data when sharing a device.
