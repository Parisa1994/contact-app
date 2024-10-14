import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const ContactPage = lazy(() => import("./pages/Contacts/ContactPage"));
const ContactDetailsPage = lazy(() => import("./pages/ContactDetailsPage"));
const Undefined = lazy(() => import("./pages/Undefined"));

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<ContactPage />} />
            <Route path="/contact" element={<ContactDetailsPage />} />
            <Route path="*" element={<Undefined />} />
          </Routes>
        </Suspense>
      </Router>
    </QueryClientProvider>
  );
};

export default App;
