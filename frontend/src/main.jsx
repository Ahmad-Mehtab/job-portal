import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import ReactDOM from "react-dom/client";

import { persistor, store } from "./redux/store.js";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import "./index.css";
import "./App.css";
import "primereact/resources/themes/lara-light-indigo/theme.css"; //theme
import "primereact/resources/primereact.min.css"; //core                                    
import 'primeicons/primeicons.css';
import Layout from './Layout';
import Home from "./components/Home/Home.jsx";
import Register from "./components/Auth/Register.jsx";
import Login from "./components/Auth/Login.jsx";
import NotFound from "./components/NotFound/NotFound.jsx";
import PrivateRouter from "./PrivateRouter.jsx";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Jobs from "./components/Job/Jobs.jsx";
import JobDetails from "./components/Job/JobDetails.jsx";
import Application from "./components/Application/Application.jsx";
import MyApplications from "./components/Application/MyApplications.jsx";
import PostJob from "./components/Job/PostJob.jsx";
import MyJobs from "./components/Job/MyJobs.jsx";

        
// const queryClient = new QueryClient({
//   defaultOptions: {
//     queries: {
//       staleTime: 10000,
//       // retry: 5, // Retry the query up to 3 times
//       // retryDelay: 1000, // Delay 1 second between retry attempts
//     },
//   },
// });'
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
      
      {
        element: <PrivateRouter />,
        children: [
          {
            path: "/job/getall",
            element: <Jobs />,
          },
          {
            path: "/job/:id",
            element: <JobDetails />,
          },
          {
            path: "/application/:id",
            element: <Application />,
          },
          {
            path: "/applications/me",
            element: <MyApplications />,
          },
          {
            path: "/job/post",
            element: <PostJob />,
          },
          {
            path: "/job/me",
            element: <MyJobs />,
          },
        ],
      },
    ],
  },
]);

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
      <RouterProvider router={router} />
      </PersistGate>
    </Provider>
  </QueryClientProvider>
);
