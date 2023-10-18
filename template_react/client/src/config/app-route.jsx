import React from "react";
import App from "./../app.jsx";
import { Navigate } from "react-router-dom";

import PagesProductDetails from "./../pages/pages/product-details.js";

const AppRoute = [
  {
    path: "*",
    element: <App />,
    children: [
      { path: "", element: <Navigate to="/pages/resume" /> },

      {
        path: "pages/*",
        children: [{ path: "resume", element: <PagesProductDetails /> }],
      },
    ],
  },
];

export default AppRoute;
