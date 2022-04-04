import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import reportWebVitals from "./reportWebVitals";
import App from "./App";
import { RequireAuth } from "./hoc/RequireAuth";
import RegisterPage from "./pages/Register";
import LoginPage from "./pages/Login";

import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";

ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            <Routes>
                <Route
                    path="/"
                    element={
                        <RequireAuth>
                            <App />
                        </RequireAuth>
                    }
                />
                <Route path="register" element={<RegisterPage />} />
                <Route path="login" element={<LoginPage />} />
            </Routes>
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
