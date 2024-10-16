import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ContactProvider } from "./context/ContactProvider";

const ContactPage = lazy(() => import("./pages/Contacts/ContactPage"));
const ContactDetailsPage = lazy(() => import("./pages/ContactDetailsPage"));
const Undefined = lazy(() => import("./pages/Undefined"));

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ContactProvider>
        <Router>
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              <Route path="/" element={<ContactPage />} />
              <Route
                path="/contact-details/:id"
                element={<ContactDetailsPage />}
              />
              <Route path="*" element={<Undefined />} />
            </Routes>
          </Suspense>
        </Router>
      </ContactProvider>
    </QueryClientProvider>
  );
};

export default App;
