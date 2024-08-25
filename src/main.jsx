// import React from "react";
// import ReactDOM from "react-dom/client";
// import { BrowserRouter as Router } from "react-router-dom";

// import App from "./App.jsx";
// import "./index.css";

// import ErrorBoundary from "./components/ErrorBoundary.jsx";

// ReactDOM.createRoot(document.getElementById("root")).render(
//   <React.StrictMode>
//     <Router>
//       <ErrorBoundary basename="/">
//         <App />
//       </ErrorBoundary>
//     </Router>
//   </React.StrictMode>
// );

import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter as Router } from "react-router-dom"; // Измените на HashRouter

import App from "./App.jsx";
import "./index.css";

import ErrorBoundary from "./components/ErrorBoundary.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <ErrorBoundary basename="/">
        <App />
      </ErrorBoundary>
    </Router>
  </React.StrictMode>
);
