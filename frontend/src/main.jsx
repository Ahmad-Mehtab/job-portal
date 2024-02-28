import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { persistor, store } from "./redux/store.js";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import "./index.css";
import { PrimeReactProvider } from 'primereact/api';
// const queryClient = new QueryClient({
//   defaultOptions: {
//     queries: {
//       staleTime: 10000,
//       // retry: 5, // Retry the query up to 3 times
//       // retryDelay: 1000, // Delay 1 second between retry attempts
//     },
//   },
// });'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      useErrorBoundary: true,
      retry: 3,
      retryDelay: 1000,
      staleTime: 60000,
      cacheTime: 600000,
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <QueryClientProvider  client={queryClient}>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
      <PrimeReactProvider>
        <App />
        </PrimeReactProvider>
      </PersistGate>
    </Provider>
  </QueryClientProvider>
);
